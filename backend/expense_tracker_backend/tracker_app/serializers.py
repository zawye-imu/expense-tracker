from rest_framework import serializers
from .models import IncomeExpense   

class IncomeExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeExpense   
        fields = ('id','description' ,'date', 'income', 'expense','category','status')