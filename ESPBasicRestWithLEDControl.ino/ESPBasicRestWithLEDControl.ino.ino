// This Project was put togethar by Dylan M. Poll
// Linkdin : https://www.linkedin.com/in/dylan-poll-4a324a1a2/
// GitHub : https://github.com/dylanpoll
// with the intent to create a email notification system
// that will allow people to catagorize emails by color and iterate by inflow of unread emails.
// this used NeoPixelBus because the esp32 has some issues with fast.led and the normal neopixel libraries.

#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>            // https://github.com/me-no-dev/ESPAsyncWebServer   and https://github.com/me-no-dev/AsyncTCP      
#include "AsyncJson.h"
#include "ArduinoJson.h"                  // https://arduinojson.org

AsyncWebServer server(80);                // server port
const char *ssid = "";          // put your wifi name here
const char *password = "";   // put your wifi password here
//const char *validToken = "";       //uncomment this if you want to add a API token
int dynoC1 = 100;
int dynoC2 = 30;
int dynoC3 = 10;


#include <NeoPixelBus.h>                  // https://github.com/Makuna/NeoPixelBus
const uint16_t PixelCount = 140;          // this example assumes 4 pixels, making it smaller will cause a failure
const uint8_t PixelPin = 23;              // make sure to set this to the correct pin, ignored for Esp8266
#define colorSaturation 100               // this is treated as a brightness in my case...

NeoPixelBus<NeoGrbFeature, Neo800KbpsMethod> strip(PixelCount, PixelPin);
RgbColor red(colorSaturation, 0, 0);
RgbColor green(0, colorSaturation, 0);
RgbColor blue(0, 0, colorSaturation);
RgbColor purple(60, 0, 85);
RgbColor dynamicColor(dynoC1, dynoC2, dynoC3);  //to apply colors by json post
RgbColor white(colorSaturation);
RgbColor black(0);
HslColor hslRed(red);
HslColor hslGreen(green);
HslColor hslBlue(blue);
HslColor hslWhite(white);
HslColor hslBlack(black);
//I don't have LEDs that clearly show gradients so I am just using the above. feel free to add your own

void badGateWay(AsyncWebServerRequest *request) {
  request->send(404, "application/json", "{\"404\":\"bad gateway\"}");
}
void setup() {   
  Serial.begin(115200);   //for the esp32
  
  strip.Begin();          //preps the LED strip
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    Serial.printf("WiFi Failed!\n");    //if this prints you have entered bad credentials above or have a whitelist on your network.
  }
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());     //this prints the devices sub IP address.
  // the next part is the recieving post route used to take in JSON requests
  // the POST route at current just echo's the content sent to it as is.
  // the endpoint will be http://***.***.*.**/postLEDSchema just replace the astrisks with your devices sub IP address.
  AsyncCallbackJsonWebHandler *postLEDSchema = new AsyncCallbackJsonWebHandler("/postLEDSchema",     //change this to your preffered route name
                                                                          [](AsyncWebServerRequest *request, JsonVariant &json) {
    DynamicJsonDocument data(1500);                 //I used a DynamicJsonDocument because it can change size, but it is slower so consider static if you need speed.
    if (json.is<JsonArray>())
    {
      data = json.as<JsonArray>();
    }
    else if (json.is<JsonObject>())
    {
      data = json.as<JsonObject>();
    }
    String testEcho;
    serializeJson(data, testEcho);                                                  //pulling fields from a JSON object using this example would be done like ~Serial.println(data["sensor"].as<char*>());~
    request->send(200, "application/json", testEcho);                               //this just echo's back the sent body, I used this to verify that the body was recieved correctly.
//    const char* token = data["token"];
//    if(strcmp(token,validToken)==0){                                              //if you want to enforce a api token
    int numleds = (data["numleds"].as<int>());                                      //this makes scaling the amount easier as the data is a part of the JSON body.
    int rate = (data["rate"].as<int>());                                            //the rate for iterating for the pattern in miliseconds
    for(int i = 0; i < numleds; i++){                                               //if you change from num leds, account for 0 and make it <=
                        String fieldName = "led";
                        fieldName += i;                                             //this adds the number for the schemaplacement
                        String diodeColor = "b";                                    //b will stand for black and fastled treats black as off
                        diodeColor = (data[fieldName].as<char*>());
                        //colors
                        if(diodeColor == "r"){
                              strip.SetPixelColor(i, red);     
                        }else
                        if(diodeColor == "g"){
                              strip.SetPixelColor(i, green);   
                        }else 
                        if(diodeColor == "B"){
                              strip.SetPixelColor(i, blue);      
                        }else                    
                        if(diodeColor == "p"){
                               strip.SetPixelColor(i, purple);
                        }else
                        if(diodeColor == "w"){
                               strip.SetPixelColor(i, white);          
                        }else 
                        if(diodeColor == "b"){                                    
                             strip.SetPixelColor(i, black);                             //sets the color for led at position i        
                        }                                                               //this will "show" or light the LEDs according to our list above,
                      strip.Show();                                                     //putting this inside the for loop means it will update for each cycle through the loop
                      delay(rate);
                      }  
//    }         
  });
  AsyncCallbackJsonWebHandler *staticLEDSchema = new AsyncCallbackJsonWebHandler("/staticLEDSchema",     //this is to make a instant post onto the leds
                                                                          [](AsyncWebServerRequest *request, JsonVariant &json) {
    DynamicJsonDocument data(1500);              
    if (json.is<JsonArray>())
    {
      data = json.as<JsonArray>();
    }
    else if (json.is<JsonObject>())
    {
      data = json.as<JsonObject>();
    }
    String testEcho;
    serializeJson(data, testEcho);                                                  
    request->send(200, "application/json", testEcho);   
//    const char* token = data["token"];       
//    if(strcmp(token,validToken)==0){                                                                      
    int numleds = (data["numleds"].as<int>());                                   
    for(int i = 0; i < numleds; i++){                                               
                        String fieldName = "led";
                        fieldName += i;                                             
                        String diodeColor = "b";                                    
                        diodeColor = (data[fieldName].as<char*>());
                        //colors
                        if(diodeColor == "r"){
                              strip.SetPixelColor(i, red);     
                        }else
                        if(diodeColor == "g"){
                              strip.SetPixelColor(i, green);   
                        }else 
                        if(diodeColor == "B"){
                              strip.SetPixelColor(i, blue);      
                        }else                    
                        if(diodeColor == "p"){
                               strip.SetPixelColor(i, purple);
                        }else
                        if(diodeColor == "w"){
                               strip.SetPixelColor(i, white);          
                        }else 
                        if(diodeColor == "b"){                                    
                             strip.SetPixelColor(i, black);                             //sets the color for led at position i        
                        }                                                               
                      }     
//    }      
                      strip.Show();                                                     //putting this inside the for loop means it will update all the leds at the same time
  });
    AsyncCallbackJsonWebHandler *solidColor = new AsyncCallbackJsonWebHandler("/solidColor",     //for all solid plain color profiles
                                                                          [](AsyncWebServerRequest *request, JsonVariant &json) {
    DynamicJsonDocument data(1500);              
    if (json.is<JsonArray>())
    {
      data = json.as<JsonArray>();
    }
    else if (json.is<JsonObject>())
    {
      data = json.as<JsonObject>();
    }
    String testEcho;
    serializeJson(data, testEcho);                                                  
    request->send(200, "application/json", testEcho);   
//    const char* token = data["token"];       
//    if(strcmp(token,validToken)==0){                                                                      
    int numleds = (data["numleds"].as<int>());                                                                                 
    String color =(data["color"].as<char*>());
                        if(color == "r"){
                              for(int i = 0; i < numleds; i++){  
                              strip.SetPixelColor(i, red); }    
                        }else
                        if(color == "g"){
                              for(int i = 0; i < numleds; i++){  
                              strip.SetPixelColor(i, green);   }
                        }else
                        if(color == "z"){
                          dynoC1 =(data["dynoC1"].as<int>());
                          dynoC2 =(data["dynoC2"].as<int>());
                          dynoC3 =(data["dynoC3"].as<int>());
                              for(int i = 0; i < numleds; i++){  
                              strip.SetPixelColor(i, dynamicColor);   }
                        }else 
                        if(color == "B"){
                              for(int i = 0; i < numleds; i++){  
                              strip.SetPixelColor(i, blue);      }
                        }else                    
                        if(color == "p"){
                              for(int i = 0; i < numleds; i++){  
                               strip.SetPixelColor(i, purple);}
                        }else
                        if(color == "w"){
                              for(int i = 0; i < numleds; i++){  
                               strip.SetPixelColor(i, white);    }  
                        }else     
                        if(color == "y"){
                              for(int i = 0; i < numleds; i++){  
                               strip.SetPixelColor(i, white);    } //need to add yellow      
                        }else 
                        if(color == "b"){                         
                              for(int i = 0; i < numleds; i++){             
                             strip.SetPixelColor(i, black);      }                       //sets the color for led at position i        
                        }                                                                    
//    }      
                      strip.Show();                                                     //putting this inside the for loop means it will update all the leds at the same time
  });
  
  server.addHandler(postLEDSchema);   //adds the "handler" or "route" to the server
  server.addHandler(staticLEDSchema); 
  server.addHandler(solidColor);   
  server.onNotFound(badGateWay);      //user attempted a null route
  server.begin();                     //this needs to be put at the end of all routing
}

void loop() { //the most important stuff is in this function
}
