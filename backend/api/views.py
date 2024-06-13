from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model, login, logout
from rest_framework import viewsets, permissions, status
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from .validations import *
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view
from django.http import JsonResponse
import requests
from duffel_api import Duffel
from amadeus import Client, ResponseError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .validations import custom_validation, validate_email, validate_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

def displaydata1(request):

    api_url = "http://127.0.0.1:8000/api/getflight"
    
    response = requests.get(api_url)
    
    if response.status_code == 200:
        flights_data = response.json()
        
        flights = flights_data.get('offers', [])
        
        for flight in flights:
            airportName = request.GET.get('name')
            cityName = request.GET.get('city_name')
            iataCode = request.GET.get('iata_code')
            
        return flights_data
    else:
        print("Error fetching flights data:", response.status_code)
        
        
@api_view(['GET'])
class FlightSearchView(APIView):
    def flight_search(request):
        origin = request.GET.get('origin')
        destination = request.GET.get('destination')
        departure_date = request.GET.get('departure_date')
        arrival_date = request.GET.get('arrival_date')
        passengers = request.GET.get('passengers')
        travel_class = request.GET.get('travel_class')
    
        flights = search_flights(
            origin,
            destination,
            departure_date,
        )
    
        return JsonResponse(flights, safe=False)

def search_flights(origin, destination, departure_date, arrival_date, passengers, travel_class):
    # Replace with the actual API endpoint and parameters
    api_url = "http://127.0.0.1:8000/api/getflight?{origin}/{destination}/{departure_date}"

    response = requests.get(api_url)
    
    if response.status_code == 200:
        flights = response.json()
    else:
        flights = {"error": "Unable to fetch flights"}
    
    return flights  
    
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

