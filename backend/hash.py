from passlib.context import CryptContext

ALGORITHM = "HS256"

PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return PWD_CONTEXT.hash(password)

# hash1 = get_password_hash("WQqv97SpJTIrkyu7IoeWd_VOOTKk4DJk4CxoiQfUyik")
# print(hash1)
# print(verify_password("WQqv97SpJTIrkyu7IoeWd_VOOTKk4DJk4CxoiQfUyik", hash1))