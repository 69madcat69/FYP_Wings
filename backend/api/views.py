from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model, login, logout
from rest_framework import viewsets, permissions, status, generics
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from .validations import *
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
import requests
from duffel_api import Duffel
from amadeus import Client, ResponseError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from .validations import custom_validation, validate_email, validate_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.core.exceptions import ObjectDoesNotExist 



# class UserRegister(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request):
#         clean_data = custom_validation(request.data)
#         serializer = UserRegisterSerializer(data=clean_data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication, BasicAuthentication)

#     def post(self, request):
#         data = request.data
#         assert validate_email(data)
#         assert validate_password(data)
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.check_user(data)
#             login(request, user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserLogout(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()

#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication, BasicAuthentication)

#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response({'user': serializer.data}, status=status.HTTP_200_OK)
                



    
def get_aircraft(request):
    duffel = Duffel(access_token='duffel_test_bl6lsCRkoKbnG3GGptTbNRkW92M2QTZDWsU_oGp_QqL')
    origin = request.GET.get('origin', 'JED')  
    destination = request.GET.get('destination', 'KUL')  
    departure_date = request.GET.get('departure_date', '2024-12-01')

    # List of Asian country IATA codes
    asian_airports_iata = [
        "PEK", "HND", "DXB", "HKG", "BKK", "NRT", "SIN", "ICN", "KUL", "CGK",
        "KIX", "PVG", "CAN", "DEL", "BOM", "SYD", "MNL", "SIN", "KIX", "SGN",
        "DME", "SVO", "LED", "VVO", "BWN", "PNH", "DAD", "HAN", "CXR", "SIN",
        "KUL", "RGN", "CEB", "OKA", "CTS", "ICN", "PUS", "HKT", "CNX", "DMK",
        "TPE", "KHH", "DPS", "SUB", "AUH", "RUH", "DOH", "KWI", "BAH", "MLE",
        "CMB", "TAS", "ALA", "TSE", "GYD", "EVN", "NQZ", "FRU", "DMM", "JED"
        ]
    def is_asian_country(iata_code):
        return iata_code[:3] in asian_airports_iata  

    if not (is_asian_country(origin) and is_asian_country(destination)):
        return JsonResponse({"error": "Both origin and destination must be in Asia."}, status=400)

    passengers = [{"type": "adult"}]
    slices = [{"origin": origin, "destination": destination, "departure_date": departure_date}]
    
    offer_request_client = duffel.offer_requests.create()
    offer_request_client.cabin_class("economy")
    offer_request_client.passengers(passengers)
    offer_request_client.slices(slices)
    offer_request_client.max_connections(1)
    offer_request_client.return_offers()
    
    response = offer_request_client.execute()
    
    def airport_to_dict(airport):
        return {
            "iata_code": getattr(airport, 'iata_code', None),
            "name": getattr(airport, 'name', None),
            "city_name": getattr(airport, 'city_name', None),
            "latitude": getattr(airport, 'latitude', None),
            "longitude": getattr(airport, 'longitude', None),
            "time_zone": getattr(airport, 'time_zone', None)
        }
        
    def airline_info(airline):
        return {
            "conditions_of_carriage_url": getattr(airline, 'conditions_of_carriage_url', None),
            "iata_code": getattr(airline, 'iata_code', None),
            "id": getattr(airline, 'id', None),
            "logo_lockup_url": getattr(airline, 'logo_lockup_url', None),
            "logo_symbol_url": getattr(airline, 'logo_symbol_url', None),
            "name": getattr(airline, 'name', None)
        }

    def extract_slice_data(slice):
        return {
            "origin": airport_to_dict(slice.origin),
            "destination": airport_to_dict(slice.destination),
            "killme": [extract_segment_data(segment) for segment in slice.segments],
            "departure_date": slice.departure_date,
            "origin_type": slice.origin_type
        } if hasattr(slice, 'segments') else {
            "origin": airport_to_dict(slice.origin),
            "destination": airport_to_dict(slice.destination),
            "departure_date": slice.departure_date
        }
         
    def extract_offer_data(offer):
        return {
            "id": offer.id,
            "total_amount": offer.total_amount,
            "total_currency": offer.total_currency,
            "available_services": offer.available_services,
            "owner": airline_info(offer.owner),
            "base_amount": offer.base_amount,
            "tax_amount": offer.tax_amount,
            "base_currency": offer.base_currency,
            "total_emissions_kg": offer.total_emissions_kg,
            "offerslices": [extract_offer_slice(slice) for slice in offer.slices],
        }

    def extract_offer_slice(slice):
        return {
            # "origin": airport_to_dict(slice.origin),
            # "destination": airport_to_dict(slice.destination),
            "segment": [extract_segment_data(segment) for segment in slice.segments],
            "duration": slice.duration
        } if hasattr(slice, 'segments') else {
            # "failure": airport_to_dict(slice.origin),
            # "destination": airport_to_dict(slice.destination),
            # "duration": slice.duration
        }

    def extract_segment_data(segment):
        return {
            "id": segment.id,
            "origin": airport_to_dict(segment.origin),
            "destination": airport_to_dict(segment.destination),
            # "operating_carrier": segment.operating_carrier,
            # "marketing_carrier": segment.marketing_carrier,
            "marketing_carrier_flight_number": segment.marketing_carrier_flight_number,
            # "aircraft": segment.aircraft,
            "duration": segment.duration,
            "distance": segment.distance,
            "stops": extract_stops_data(segment.stops),
            "departing_at": segment.departing_at,
            "arriving_at": segment.arriving_at
        }
            
    def extract_stops_data(stop):
        return{
            "id": getattr(stop, 'id', None),
            "duration": getattr(stop, 'duration', None)
            # "departing_at": getattr(stop, 'departing_at', None),


            # "id": stop.id,
            # "departing_at":stop.departing_at,
            # "arriving_at":stop.arriving_at
        }
    
    offer_request_data = {
        "id": response.id,
        "cabin_class": response.cabin_class,
        "created_at": response.created_at,
        "live_mode": response.live_mode,
        "slices": [extract_slice_data(slice) for slice in response.slices],
        "offers": [extract_offer_data(offer) for offer in response.offers],
    }
        
    return JsonResponse(offer_request_data, safe=False)

# def SkyscannerHotelSearch(request):
    
#         url = "https://booking-com15.p.rapidapi.com/api/v1/meta/locationToLatLong"

#         querystring = {"query":"kuala"}
#         # url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates"
#         # querystring = {"arrival_date":"2024-11-17", "departure_date":"2024-11-18","latitude":"19.24232736426361","longitude":"72.85841985686734","adults":"1","children_age":"0,17","room_qty":"1","units":"metric","temperature_unit":"c","languagecode":"en-us","currency_code":"EUR"}
#         # querystring = {"arrival_date":"2024-11-17", "departure_date":"2024-11-18","hotel_id":"191605","adults":"1","children_age":"1,17","room_qty":"1","units":"metric","temperature_unit":"c","languagecode":"en-us","currency_code":"EUR"}
#         headers = {
#         "x-rapidapi-key": "50efc8a679mshd6e0b309ce18c1cp1d72abjsn9f3ba584030d", 
#         "x-rapidapi-host": "booking-com15.p.rapidapi.com"
#         }

#         response = requests.get(url, headers=headers, params=querystring)
#         if response.status_code == 200:
#             return JsonResponse(response.json(), safe=False, status=response.status_code)
#         else:
#             return JsonResponse({"error": response.json()}, status=response.status_code)


def SkyscannerHotelSearch(request):
    location_name = request.GET.get('location', 'kuala')
    check_in_date = request.GET.get('check_in', '2024-11-17')
    check_out_date = request.GET.get('check_out', '2024-11-18')
    adults = request.GET.get('adults', '1')
    children_age = request.GET.get('children_age', '0,17')
    room_qty = request.GET.get('room_qty', '1')
    currency_code = request.GET.get('currency_code', 'EUR')
    
    url_lat_long = "https://booking-com15.p.rapidapi.com/api/v1/meta/locationToLatLong"
    querystring_lat_long = {"query": location_name}
    headers = {
        'x-rapidapi-key': "f5cb0387f1msh632789447cc8d16p1968d8jsnd1fbf2bd2707",
        'x-rapidapi-host': "booking-com15.p.rapidapi.com"
    }

    response_lat_long = requests.get(url_lat_long, headers=headers, params=querystring_lat_long)
    if response_lat_long.status_code != 200:
        return JsonResponse({"error": response_lat_long.json()}, status=response_lat_long.status_code)
    
    lat_long_data = response_lat_long.json()
    if not lat_long_data['status']:
        return JsonResponse({"error": "Location not found"}, status=404)
    
    lat = lat_long_data['data'][0]['geometry']['location']['lat']
    lng = lat_long_data['data'][0]['geometry']['location']['lng']
    
    url_hotels = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates"
    querystring_hotels = {
        "arrival_date": check_in_date,
        "departure_date": check_out_date,
        "latitude": lat,
        "longitude": lng,
        "adults": adults,
        "children_age": children_age,
        "room_qty": room_qty,
        "units": "metric",
        "temperature_unit": "c",
        "languagecode": "en-us",
        "currency_code": currency_code
    }

    response_hotels = requests.get(url_hotels, headers=headers, params=querystring_hotels)
    if response_hotels.status_code != 200:
        return JsonResponse({"error": response_hotels.json()}, status=response_hotels.status_code)
    
    hotels_data = response_hotels.json()
    hotel_details_list = []

    url_details = "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails"
    
    for hotel in hotels_data['data']:
        hotel_id = hotel['id']
        querystring_details = {"hotel_id": hotel_id}
        
        response_details = requests.get(url_details, headers=headers, params=querystring_details)
        if response_details.status_code == 200:
            details_data = response_details.json()
            hotel_details = {
                "url": details_data.get('url'),
                "accommodation_type_name": details_data.get('accommodation_type_name'),
                "arrival_date":details_data.get('arrival_date'),
                "departure_date":details_data.get('departure_date'),
            }
            hotel_details_list.append(hotel_details)
        else:
            hotel_details_list.append({"error": "Details not found for hotel ID: {}".format(hotel_id)})

    return JsonResponse(hotel_details_list, safe=False, status=200)

User = get_user_model()

class UserLogin(TokenObtainPairView):
    serializer_class = UserToken

class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegister

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def protectedView(request):
    output = f"Welcome {request.user}, Authentication Successful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def profileInfo(request):
    user = request.user
    serializer = UserWithBookingSerializer(user)
    return Response(serializer.data)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
# class UserProfileUpdate(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request, *args, **kwargs):
#         user = request.user
#         serializer = UserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def UserProfileUpdate(request):
    new_firstName = request.data.get('firstName', '')
    new_lastName = request.data.get('lastName', '')
    new_email = request.data.get('email', '')
    new_phone = request.data.get('phone', '')
    new_password = request.data.get('password', '')

    try:
        profile = request.user
    except ObjectDoesNotExist:
        return Response({'message': 'Profile not found'}, status=404)
        
    profile.firstName = new_firstName
    profile.lastName = new_lastName      
    profile.phone = new_phone      
    profile.email = new_email      
    profile.password = new_password      

    profile.save()

    return Response({'message': 'Data updated successfully'})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def createBooking(request):
    user = request.user
    data = request.data
    booking = Booking(
        user=user,
        duffel_booking_id=data['id'],
        origin=data['origin'],
        destination=data['destination'],
        departure_date=data['departure_date'],
        return_date=data.get('return_date'),
        total_amount=data['total_amount'],
        currency=data['currency']
    )
    booking.save()
    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id, user=request.user)
        booking.delete()
        return Response({'message': 'Booking deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)