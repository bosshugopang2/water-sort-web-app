# water-sort-web-app

A water sort puzzle game plus a solver.

## Run locally

```bash
go run . --serve
```

Then open:

```text
http://localhost:8080
```

## What you can do

- Play the puzzle directly in the browser
- Click bottles to pour liquids
- Click the Solve button to get the exact moves from the Go solver
- Use the example puzzle or input your own JSON

## Example puzzle

```json
{
  "bottles": [
    ["GREEN", "RED", "RED", "RED"],
    ["GREEN", "GREEN", "GREEN", "RED"],
    ["EMPTY", "EMPTY", "EMPTY", "EMPTY"]
  ]
}
```
