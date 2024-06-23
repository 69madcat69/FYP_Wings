# from django.core.exceptions import ValidationError
# from django.contrib.auth import get_user_model
# from django.core.validators import validate_email as django_validate_email
# from django.contrib.auth.password_validation import validate_password as django_validate_password

# UserModel = get_user_model()


# def custom_validation(data):
#     email = data['email'].strip()
#     password = data['password'].strip()
#     ##
#     if not email or UserModel.objects.filter(email=email).exists():
#         raise ValidationError('choose another email')
#     ##
#     if not password or len(password) < 8:
#         raise ValidationError('choose another password, min 8 characters')
#     ##
#     return data


# def validate_email(data):
#     email = data['email'].strip()
#     if not email:
#         raise ValidationError('an email is needed')
#     return True


# def validate_password(data):
#     password = data.get('password')
#     if not password:
#         raise ValidationError('Password is required')
#     try:
#         django_validate_password(password)
#     except ValidationError as e:
#         raise ValidationError(', '.join(e.messages))
#     return True