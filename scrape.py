import json
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "ollama/llama3.2:3b",
        "temperature": 0,
        "format": "json",  # Ollama needs the format to be specified explicitly
        "base_url": "http://localhost:11434",  # set Ollama URL
    },
    # "embeddings": {
    #    "model": "ollama/nomic-embed-text",
    #    "base_url": "http://localhost:11434",  # set Ollama URL
    # },
    "verbose": True,
    "headless": False,
}

smart_scraper_graph = SmartScraperGraph(
    prompt='Extract the list of "Svuotamenti" for each "Comune", day by day. You can find those information in the <table> tags with class that follow this pattern “table comune comune_zona_<number>" where <number> is the label assigned to the "Comune"',
    source="https://contarina.it/cittadino/raccolta-differenziata/eco-calendario",
    config=graph_config,
)

result = smart_scraper_graph.run()

print(json.dumps(result, indent=4))
