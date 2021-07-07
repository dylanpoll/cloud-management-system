import { Indent, SmallText, HeaderText, PageTitleText } from "../components/Layout";
export const APIinfo = () => (
    <div>  
        
        <PageTitleText> Who Is Home {'\n'}</PageTitleText>
        <Indent><Indent><Indent><SmallText>
            This is just using NMAP from the pi and a python script validating connected devices against listed mac addresses and if the person marked is present it updates a database entree and serves it on the site. Working on adding a discord bot for notifications.
        </SmallText><Indent></Indent></Indent></Indent></Indent>
        
        <PageTitleText>{'\n'} Webcam {'\n'}</PageTitleText>
        <Indent><Indent><Indent><SmallText>
            Serving a HLS webcam feed via react and nginx. its using video feed clustering and can keep a active history backed up if needed. 
            Can add as many from as many devices as desired as feed is not directly 
            tied to host device. I am looking at adding in motion/activity detection and a alarm system to tie this into a security system.
        </SmallText><Indent></Indent></Indent></Indent></Indent>

        <PageTitleText>{'\n'}ESP restful LED handler and API information {'\n'}</PageTitleText>
        <Indent><Indent><Indent><SmallText>
            This API has the ability to use validation tokens for posting, passing the refresh speed with the animation, and the number of LEDS in addition to the colors for each individual LED.
            Currently there are 3 main post methods. {'\n'} those are :
        </SmallText><Indent></Indent><SmallText>
            <ul>
                <span><li> Static LED Schema</li></span>
                <span><li> Clock Pass Schema</li></span>
                <span><li> Solid Color Post</li></span>
                <span><li> SOON TO COME repeating animation post(move values by 1 forward)</li></span>
            </ul>
        </SmallText></Indent></Indent></Indent>

        <Indent><Indent><Indent>
        <Indent><HeaderText>Static LED schema {'\n'}</HeaderText>
        <Indent><Indent><SmallText>
                This is used to post a instant refresh onto the leds, so no gradiance or animation, like a frame reload. NOTE : even if you pass a clock it wont be applied{'\n'}
                {'\n'}the JSON body should look like :
                <Indent><li><span>"token" : "valid","numleds" : "60","led0": "r","led1": "g","led2": "B".........(as many led values as you need)</span></li></Indent>
        </SmallText></Indent></Indent></Indent>

        <Indent><HeaderText>Clock Pass Schema {'\n'}</HeaderText>
        <Indent><Indent><SmallText>
            this is like the above, except this will incriment changes going up, and the "rate" will be the milisecond delay between each led iteration.
            <Indent><li><span>"token" : "valid","numleds" : "60","rate" : "10","led0": "r","led1": "g","led2": "B".........(as many led values as you need)</span></li></Indent>
        </SmallText></Indent></Indent></Indent>
        
        <Indent><HeaderText>Solid Color Post{'\n'}</HeaderText>
        <Indent><Indent><SmallText>
            This does not require you attach a value to each led, it will just apply the color to the number you list for numleds.
            <Indent><li><span>"token" : "valid","numleds" : "60","rate" : "10","color" : "y"</span></li></Indent>
        </SmallText></Indent></Indent></Indent>
        </Indent></Indent></Indent>
    </div>
);