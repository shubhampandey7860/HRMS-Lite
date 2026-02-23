from django.db import models

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]
    
    employee_id = models.CharField(max_length=50, db_index=True)
    date = models.DateField(db_index=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'attendance'
        ordering = ['-date', 'employee_id']
        unique_together = ['employee_id', 'date']

    def __str__(self):
        return f"{self.employee_id} - {self.date} - {self.status}"
