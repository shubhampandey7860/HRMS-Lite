from rest_framework import serializers
from .models import Attendance
from datetime import date

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'employee_id', 'date', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_employee_id(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Employee ID is required")
        return value.strip()

    def validate_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Cannot mark attendance for future dates")
        return value

    def validate_status(self, value):
        if value not in ['Present', 'Absent']:
            raise serializers.ValidationError("Status must be 'Present' or 'Absent'")
        return value
