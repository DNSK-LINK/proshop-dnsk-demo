from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from base.serializers import UserSerializer, UserSerializerWithToken


                        # Create your views here.


###    TOKENS PART    ###

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):

        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        print(serializer)
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


###     USER PART     ###


@api_view(['POST'])
def registerUser(request):

    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):

    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    if 'name' in data:
        if data['name'] != '':
            user.first_name = data['name']

    if 'email' in data:
        if data['email'] != '':
            user.username = data['email']
            user.email = data['email']

    if 'password' in data:
        if data['password'] != '':
            user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


###    ADMIN PART   ###


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):

    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):

    user = User.objects.get(id=pk)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User deleted successfully')