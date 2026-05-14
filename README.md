# Japan Tourism Statistics

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository provides automatically updated tourism visitation statistics for Japan, aggregated by prefecture and city. The data is consolidated into a single, easy-to-use CSV file.

## Data Source

The data is sourced from the [Digital Tourism Statistics Open Data](https://www.nihon-kankou.or.jp/home/jigyou/research/d-toukei/) provided by the Japan Tourism Agency.

## Features

-   **Monthly Data**: Tourism visitation numbers for each prefecture and major city in Japan.
-   **Automated Updates**: A GitHub Actions workflow runs daily to download the latest data, ensuring the dataset remains current.
-   **Consolidated CSV**: All individual data files are processed and combined into a single file, `data/all.csv`, for convenient analysis.
-   **Deno-Powered**: The data processing pipeline is built with Deno.

## Data Format (`data/all.csv`)

The main output file is `data/all.csv`, which contains the following columns:

| Column | Description                                     | Example |
| :----- | :---------------------------------------------- | :------ |
| `month`  | The year and month of the data in `YYYYMM` format. | `202201`  |
| `lgcode` | The local government code for the region.       | `1101`    |
| `n`      | The total number of visitors for that month.    | `230903`  |

## Automation

This repository uses a GitHub Actions workflow defined in `.github/workflows/update.yml`. The workflow runs on a daily schedule to:
1.  Scrape the data source page for new CSV files.
2.  Download any new files.
3.  Rebuild the consolidated `data/all.csv` file.
4.  Commit and push the updated data back to the repository.

## Local Usage

You can run the data update process locally.

### Prerequisites

-   [Deno](https://deno.land/)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/japan-kanko-stat.git
    cd japan-kanko-stat
    ```

2.  **Run the Deno scripts:**
    ```bash
    # Download the latest source CSV files into the /data directory
    deno run -A download.js

    # Consolidate the downloaded files into data/all.csv
    deno run -A make.js
    ```

## License

MIT License — see [LICENSE](LICENSE).