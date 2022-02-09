from statistics import mode
from unicodedata import category
from django.db import models

# Create your models here.

class IncomeExpense(models.Model):
    description = models.TextField()
    date = models.DateField()
    income = models.FloatField()
    expense = models.FloatField()
    category = models.CharField(max_length=64)
    status = models.CharField(max_length=64)