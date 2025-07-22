import hashlib
import hmac
import json
import os
from urllib.parse import parse_qs
from typing import Dict, Optional

class TelegramAuth:
    def __init__(self):
        self.bot_token = os.getenv("TELEGRAM_BOT_SECRET", "")
    
    def validate_init_data(self, init_data: str) -> Optional[Dict]:
        """
        Валидация данных инициализации от Telegram Web App
        """
        if not self.bot_token:
            # В режиме разработки возвращаем тестовые данные
            return {
                "user": {
                    "id": 12345,
                    "first_name": "Test",
                    "username": "testuser"
                }
            }
        
        try:
            # Парсим данные
            parsed_data = parse_qs(init_data)
            
            # Извлекаем hash
            received_hash = parsed_data.get('hash', [None])[0]
            if not received_hash:
                return None
            
            # Создаем строку для проверки
            data_check_arr = []
            for key, value in parsed_data.items():
                if key != 'hash':
                    data_check_arr.append(f"{key}={value[0]}")
            
            data_check_arr.sort()
            data_check_string = '\n'.join(data_check_arr)
            
            # Вычисляем hash
            secret_key = hashlib.sha256(self.bot_token.encode()).digest()
            calculated_hash = hmac.new(
                secret_key,
                data_check_string.encode(),
                hashlib.sha256
            ).hexdigest()
            
            # Проверяем hash
            if calculated_hash != received_hash:
                return None
            
            # Парсим данные пользователя
            user_data = parsed_data.get('user', [None])[0]
            if user_data:
                user = json.loads(user_data)
                return {"user": user}
            
            return None
            
        except Exception as e:
            print(f"Error validating init data: {e}")
            return None
    
    def get_user_id_from_init_data(self, init_data: str) -> Optional[int]:
        """
        Извлекает ID пользователя из init data
        """
        validated_data = self.validate_init_data(init_data)
        if validated_data and 'user' in validated_data:
            return validated_data['user'].get('id')
        return None

telegram_auth = TelegramAuth() 