import requests
from bs4 import BeautifulSoup
import json

# URL 설정
url = 'https://www.dankook.ac.kr/web/international/43'

# 웹페이지 HTML 코드를 가져온다
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# 학과 이름이 포함된 <a> 태그를 찾기
department_links = soup.select('div.tab_wrap ul li a')

# 학과 이름 출력

majors = [link.text.strip() for link in department_links]

with open('majors.json', 'w', encoding='utf-8') as file:
    json.dump(majors, file, ensure_ascii=False, indent=4)
    
print("학과 이름이 'majors.json' 파일로 저장되었습니다.")