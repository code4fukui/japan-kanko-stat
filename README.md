# Japan Tourism Statistics

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This project provides a dashboard for tourism visitation statistics in Japan, aggregated by prefecture and city.

## Data Source
The data is sourced from the [Digital Tourism Statistics Open Data](https://www.nihon-kankou.or.jp/home/jigyou/research/d-toukei/) provided by the Japan Tourism Agency.

## Features
- Monthly tourism visitation data for each prefecture and major city in Japan
- Automated data updates via GitHub Actions
- Consolidated CSV data file for easy access

## Usage
The project uses Deno to download the latest CSV data files and combine them into a single `data/all.csv` file. To run the update process:

1. Install Deno: https://deno.land/
2. Run the following commands:

```
deno run -A download.js
deno run -A make.js
```

This will download the latest data files and generate the `data/all.csv` file.

## License
MIT License — see [LICENSE](LICENSE).