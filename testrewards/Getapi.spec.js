const {test,expect} = require('@playwright/test');  

test('GET DailyusageAPI testing', async ({request})=> 
{ 
    const response = await request.get('https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage-daily/system-status?clid=8da91acc7b09930'); 
    expect(response.status()).toBe(200);    

    const body = await response.json();  
    console.log(body);

});    

test('GET MonthlyusageAPI testing',async ({request})=> 
{ 
    const response = await request.get('https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage-monthly/system-status?clid=8da91acc7b09930');
    expect(response.status()).toBe(200);   
    const body = await response.json();  
    console.log(body);
   
   

}); 

test('GET WeeklyusageAPI testing', async ({request})=> 
{  
    const response = await request.get('https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage/system-status?clid=8da91acc7b09930')
    expect(response.status()).toBe(200);  

    const body = await response.json(); 
    console.log(body);

});  

test('GetAPI testing',async ({request})=> 
{ 
    const response = await request.get('https://api.santabrowser.com/quests/bff/v1/user/8da91acc7b09930/summary-lite');  
    expect(response.status()).toBe(200);  

    const body  = await response.json()
    console.log(body);  


}); 

