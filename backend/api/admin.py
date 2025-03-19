from django.contrib import admin
from .models import *


class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read']
    list_display = ['sender', 'reciever', 'message', 'is_read']

# Register your models here.
admin.site.register(Producto)
admin.site.register(Categoria)
admin.site.register(Usuarios)
admin.site.register(Rol)
admin.site.register(ChatMessage, ChatMessageAdmin)