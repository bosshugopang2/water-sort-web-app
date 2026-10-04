package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
)

type SolveRequest struct {
	Bottles bottlesArray `json:"bottles"`
}

func main() {
	file := flag.String("file", "game.json", "specify the mapping file you want to solve\n--file game.json")
	port := flag.Int("port", 8080, "port for the web server")
	serve := flag.Bool("serve", false, "run the web app instead of CLI mode")
	flag.Parse()

	if *serve {
		startWebServer(*port)
		return
	}

	startDate := time.Now()
	game := NewGame(*file)
	result := game.solve()
	endDate := time.Now()

	diff := endDate.Sub(startDate)
	fmt.Printf("Solution: %v\nduration: %s\n", result.Bottles, diff.String())
	for _, v := range result.Moves {
		fmt.Println(v)
	}
}

func startWebServer(port int) {
	http.Handle("/", http.FileServer(http.Dir("./web")))
	http.HandleFunc("/api/solve", handleSolve)

	addr := fmt.Sprintf(":%d", port)
	log.Printf("Web app running at http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func handleSolve(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST is allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SolveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	if len(req.Bottles) == 0 {
		http.Error(w, "Puzzle must include bottles", http.StatusBadRequest)
		return
	}

	game := Game{Bottles: req.Bottles}
	result := game.solve()

	w.Header().Set("Content-Type", "application/json")
	if len(result.Moves) == 0 {
		_ = json.NewEncoder(w).Encode(map[string]interface{}{
			"solved": false,
			"moves":  []string{},
		})
		return
	}

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"solved":     true,
		"moves":      result.Moves,
		"finalState": result.Bottles,
	})
}
