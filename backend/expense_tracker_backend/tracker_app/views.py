from math import perm
from django.shortcuts import render
from .serializers import IncomeExpenseSerializer 
from rest_framework import viewsets      
from .models import IncomeExpense 
from rest_framework import permissions
# Create your views here.

class IncomeExpenseView(viewsets.ModelViewSet):  
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = IncomeExpenseSerializer   

    def get_queryset(self):
        queryset = IncomeExpense.objects.all()
        if self.request.method == 'GET':
            start_date = self.request.query_params.get('start_date')
            end_date = self.request.query_params.get('end_date')
            if start_date is not None and end_date is not None:
                queryset= IncomeExpense.objects.filter(date__range=[start_date,end_date])
                return queryset
        return queryset