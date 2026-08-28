# Copy audit — polish round 1

Reviewed: 28 August 2026. Counts treat commands and hyphenated terms as one
word. No landing or README sentence exceeds 22 words. The banned-word scan
found no matches.

## Landing copy

| Copy | Words | Result |
| --- | ---: | --- |
| Check workflow differences before changing CI runners | 7 | Pass |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Pass |
| Open the sample report. | 4 | Pass |
| Each sign represents one sample workflow requirement. | 7 | Pass |
| Find incompatible steps before switching runners | 6 | Pass |
| Read the bundled sample report. | 5 | Pass |
| Share the compatibility report | 4 | Pass |
| Install the CLI. | 3 | Pass |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | Pass |

## README copy

| Copy | Words | Result |
| --- | ---: | --- |
| It inventories workflow requirements and compares them with a versioned runner profile. | 11 | Pass |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 13 | Pass |
| The command copies a sample repository to a temporary directory. | 10 | Pass |
| It checks the bundled `act` profile. | 6 | Pass |
| It saves a Markdown report and prints the path. | 9 | Pass |
| Exit `0` means portable or warnings only. | 7 | Pass |
| Exit `1` means a nonportable requirement. | 6 | Pass |
| Exit `2` means invalid input or usage. | 7 | Pass |
| The probe checks declared commands and shells on the current host. | 11 | Pass |
| It also reports filesystem case behavior and Docker socket access. | 10 | Pass |

## Terminology

| Concept | One term |
| --- | --- |
| GitHub Actions definition | workflow |
| Target capability definition | runner profile |
| Result document | report |
| Declarative mismatch | static finding |
| Host observation mismatch | observed finding |
| One-click input | sample data |
| Restricted host checking mode | sandbox probe |
