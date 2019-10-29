package tests

import (
	"testing"

	"github.com/incrementing-integers-service/server/models/user"
	"github.com/lib/pq"
	"github.com/stretchr/testify/assert"
)

func TestUserSuite(t *testing.T) {
	assert := assert.New(t)

	u1 := &user.User{Email: "asds@adsd.com", Password: "test1", IntValue: 111}
	t.Run("create user with default int value", func(t *testing.T) {
		_, err := user.Create(db, u1)
		assert.Equal(pq.ErrorCode("23503"), err.(*pq.Error).Code, "state row must exist before user foreign key reference")
	})

	t.Run("create user with same index as previous", func(t *testing.T) {
		_, err := user.Create(db, u1)
		assert.Equal(pq.ErrorCode("23505"), err.(*pq.Error).Code, "unique index violation")
	})

	t.Run("update one user integer value", func(t *testing.T) {
		err := user.UpdateInteger(db, u1.ID, 6)
		assert.Equal(nil, err)
	})

	t.Run("get one user", func(t *testing.T) {
		u2, err := user.Get(db, u1.ID)
		assert.Equal(nil, err)
		assert.Equal(u1.ID, u2.(*user.User).ID, "expect insert and get results to match")
	})

	t.Run("get user list", func(t *testing.T) {
		iUsers, err := user.GetList(db)
		assert.Equal(nil, err)
		assert.Equal(1, len(iUsers))
	})
}
