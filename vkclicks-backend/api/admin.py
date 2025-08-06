from django.contrib import admin
from .models import Photographer, PhotographerTeam, PhotographyPackage, PortfolioImage, Booking


@admin.register(Photographer)
class PhotographerAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone_number', 'location', 'type_of_photography']
    search_fields = ['user__username', 'phone_number', 'location']
    list_filter = ['type_of_photography', 'location']


@admin.register(PhotographerTeam)
class PhotographerTeamAdmin(admin.ModelAdmin):
    list_display = ['photographer', 'name', 'role']
    search_fields = ['name', 'role', 'photographer__user__username']
    list_filter = ['role']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('photographer__user')


@admin.register(PhotographyPackage)
class PhotographyPackageAdmin(admin.ModelAdmin):
    list_display = ['photographer', 'name', 'event_type', 'price', 'duration', 'delivery_time']
    search_fields = ['name', 'event_type', 'photographer__user__username']
    list_filter = ['event_type', 'price', 'duration', 'delivery_time']
    ordering = ['photographer', 'event_type', 'price']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('photographer__user')


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ['photographer', 'caption', 'image']
    search_fields = ['caption', 'photographer__user__username']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('photographer__user')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'photographer', 'package', 'event_date', 'event_time', 'status', 'created_at']
    search_fields = ['client_name', 'client_email', 'client_phone', 'photographer__user__username']
    list_filter = ['status', 'event_date', 'event_type', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('client_name', 'client_email', 'client_phone')
        }),
        ('Booking Details', {
            'fields': ('photographer', 'package', 'event_date', 'event_time', 'event_location', 'event_type')
        }),
        ('Additional Information', {
            'fields': ('special_requests', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('photographer__user', 'package')
    
    actions = ['mark_as_confirmed', 'mark_as_completed', 'mark_as_cancelled']
    
    def mark_as_confirmed(self, request, queryset):
        queryset.update(status='confirmed')
        self.message_user(request, f"{queryset.count()} booking(s) marked as confirmed.")
    mark_as_confirmed.short_description = "Mark selected bookings as confirmed"
    
    def mark_as_completed(self, request, queryset):
        queryset.update(status='completed')
        self.message_user(request, f"{queryset.count}) booking(s) marked as completed.")
    mark_as_completed.short_description = "Mark selected bookings as completed"
    
    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, f"{queryset.count()} booking(s) marked as cancelled.")
    mark_as_cancelled.short_description = "Mark selected bookings as cancelled"
