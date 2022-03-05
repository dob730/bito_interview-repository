const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "7.0",
        deviceName: "emulator-5554",
        appPackage: "com.android.calculator2",
        appActivity: ".Calculator",
        automationName: "UiAutomator2"
    }
};



async function main() {
    const client = await wdio.remote(opts);
    for(let i=1;i<=10;i++){
        if(i>9){
            let num = i.toString();
            for(let j =0;j<num.length;j++){
                const digit = await client.$('id:com.android.calculator2:id/digit_'+num.charAt(j)+'');
                await digit.click();
            }
            const plus = await client.$('id:com.android.calculator2:id/op_add');
            await plus.click();
            continue;
        }
            
        
        const numBtn = await client.$('id:com.android.calculator2:id/digit_'+i+'');
        const plus = await client.$('id:com.android.calculator2:id/op_add');
        await numBtn.click();
        await plus.click();

    }
    const equal = await client.$('id:com.android.calculator2:id/eq');
    await equal.click();
    const result = await client.$('id:com.android.calculator2:id/result')
    const value = await result.getText();
    assert.equal(value, '55');
    await client.deleteSession();
   
}

main();