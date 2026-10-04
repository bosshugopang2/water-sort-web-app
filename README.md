# water-sort-web-app

A web app version of the original Go-based water sort puzzle solver.

## Run locally

```bash
go run . --serve
```

Then open:

```text
http://localhost:8080
```

## Example Puzzle

```json
{
  "bottles": [
    ["GREEN", "RED", "RED", "RED"],
    ["GREEN", "GREEN", "GREEN", "RED"],
    ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]
  ]
}
```

## Notes

This keeps the original solver logic and wraps it in a simple browser frontend so it can be used on a phone or desktop browser.
