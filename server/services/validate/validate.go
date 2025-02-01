package validate

import (
	"regexp"
)

func StrNotEmpty(s ...string) bool {
	for _, v := range s {
		if v == "" {
			return false
		}
	}
	return true
}

var hex_colour_regex = regexp.MustCompile(`^#(?:[0-9a-fA-F]{3}){1,2}$`)

func IsHexColorCode(s string) bool {
	return hex_colour_regex.MatchString(s)
}
