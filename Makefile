test: checkCodeStyle lintCode

checkCodeStyle: 
	jscs js/**

lintCode:
	jshint js/**
