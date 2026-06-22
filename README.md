# ThermoSync Web

Real-Time IoT Temperature Monitoring Dashboard using ESP32-S3, DS18B20 and Adafruit IO.

## Features

* Live Temperature Monitoring
* Temperature History Tracking
* Analytics Dashboard
* Adafruit IO Cloud Integration
* Mobile Friendly UI
* Android App Version Available

## Hardware Used

* ESP32-S3
* DS18B20 Temperature Sensor

## Software Used

* HTML
* CSS
* JavaScript
* Adafruit IO
* Android Studio
## Hardware Connections

### ESP32-S3 ↔ DS18B20

| DS18B20 Pin | ESP32-S3 Pin |
| ----------- | ------------ |
| VCC         | 3.3V         |
| GND         | GND          |
| DATA        | GPIO 4       |

### Notes

* DS18B20 DATA pin and VCC pin idayila 4.7kΩ pull-up resistor use pannavum.
* ESP32-S3 board Wi-Fi moolama Adafruit IO cloud-ku data upload pannum.

## Hardware Components

* ESP32-S3 Development Board
* DS18B20 Temperature Sensor
* 4.7kΩ Resistor
* Breadboard
* Jumper Wires
* USB Cable

## System Architecture

DS18B20 Temperature Sensor
↓
ESP32-S3
↓
Wi-Fi
↓
Adafruit IO Cloud
↓
ThermoSync Web Dashboard
↓
Android Application

## Project Author

Govindhan S

B.E Electronics and Communication Engineering

Suguna College of Engineering

Coimbatore, Tamilnadu, India
