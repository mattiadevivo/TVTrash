import requests
from bs4 import BeautifulSoup

# Send a GET request to the webpage
url = "https://contarina.it/cittadino/raccolta-differenziata/eco-calendario"
response = requests.get(url)

# If the GET request is successful, the status code will be 200
if response.status_code == 200:
    # Get the content of the response
    page_content = response.content

    # Create a BeautifulSoup object and specify the parser
    soup = BeautifulSoup(page_content, "html.parser")

    # Find all table elements with class that follow the pattern "table comune comune_zona_<number>"
    tables = soup.find_all(
        "table",
        recursive=True,
        attrs={"class": lambda x: x and x.startswith("table svuotamenti")},
    )
    print(tables)
    for table in tables:
        print(f"Comune: {table.find('th', text=True).text.strip()}")

        # Find all rows in the table
        rows = table.find_all("tr")
        for row in rows[1:]:
            cols = row.find_all("td")
            if len(cols) > 0:
                comune = cols[0].find("span", text=True).text.strip()
                data = cols[1].find("span", text=True).text.strip()
                svuotamenti = cols[2].find_all("span", text=True)

                # Print each day's waste collection point
                for i, svu in enumerate(svuotamenti):
                    print(f"  {data}:")
                    print(f"    {comune} ({svu.text.strip()})")

else:
    print("Failed to retrieve the webpage")
