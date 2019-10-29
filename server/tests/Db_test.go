package tests

import (
	"log"
	"time"
)

func report(start time.Time, tc *testConditions) {
	elapsed := time.Since(start)
	log.Printf("%d workers inserting %d at a time took %s. With prepared stm? %t, total insert: %d", tc.workers, tc.batch, elapsed, tc.preparedStm, tc.num)
}

const testNum = 20000
const insertSQL = "INSERT INTO profile_rules VALUES (100,100);"

type testConditions struct {
	name        string
	num         int
	batch       int
	preparedStm bool
	workers     int
}

func newTc(prep bool, batch, worker int) *testConditions {
	return &testConditions{num: testNum, batch: batch, preparedStm: prep, workers: worker}
}
