package handlers

import "github.com/wuv21/info344-in-class/tasksvr/models/tasks"

//Context holds all the shared values that
//multiple HTTP Handlers will need
type Context struct {
	TasksStore tasks.Store
}
