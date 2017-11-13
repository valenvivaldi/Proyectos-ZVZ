#!/bin/bash

rm *.class  
javac Main.java
java  -cp ".:postgresql-9.0-801.jdbc4.jar" Main   
