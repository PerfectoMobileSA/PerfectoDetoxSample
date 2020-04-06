describe('Perfecto Detox Sample', () => {
  beforeEach(async () => {
  	console.log('beforeEach');
    await device.reloadReactNative();
  });

  it('should have question element visible', async () => {
    await waitFor(element(by.id('question_screen'))).toBeVisible().withTimeout(6000);
    await device.takeScreenshot('app-open');
    await expect(element(by.id('question_screen'))).toBeVisible();
  	await expect(element(by.id('question_screen').withAncestor(by.id('question_text'))));
  });

  it('should have text input field visible', async () => {
    await waitFor(element(by.id('text_input_field'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('text_input_field'))).toBeVisible();
  });

  it('should be able to type text and new text should be visible', async () => {
    await waitFor(element(by.id('text_input_field'))).toBeVisible().withTimeout(6000);

    try
    // text input is not always activated on some devices
    {
     await element(by.id('text_input_field')).typeText('new perfecto user');
    }
    catch (e) {
     await element(by.id('text_input_field')).tap();
     await element(by.id('text_input_field')).typeText('new perfecto user');
    }

    try
    {
     // close keyboard iOS
     await element(by.label('Done')).atIndex(0).tap();
    }
    catch (e) {
    }

    try
    {
     // close keyboard Android
     await device.takeScreenshot('before-close-keyboard');
     //click android 'Back' button
     await device.sendADBInputCommand('keyevent 4');
     await device.takeScreenshot('after-close-keyboard');
    }
    catch (e) {
    }

    await waitFor(element(by.id('text_input_field'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('text_input_field'))).toBeVisible();
    await waitFor(element(by.text('new perfecto user'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('text_input_field'))).toHaveText('new perfecto user');
  });

  it('should say Buy 101 devices for wrong_answer_button1 element', async () => {
    await waitFor(element(by.id('wrong_answer_button1'))).toBeVisible().withTimeout(6000);
  	await expect(element(by.id('wrong_answer_button1'))).toBeVisible();
  	await expect(element(by.id('wrong_answer_button1').withAncestor(by.text('Buy 101 devices'))));
  });

  it('should say Ask mom for help for wrong_answer_button2 element', async () => {
    await waitFor(element(by.id('wrong_answer_button2'))).toBeVisible().withTimeout(6000);
  	await expect(element(by.id('wrong_answer_button2'))).toBeVisible();
  	await expect(element(by.id('wrong_answer_button2').withAncestor(by.text('Ask mom for help'))));
  });

  it('should say Use Perfecto Cloud for correct_answer_button element', async () => {
    await waitFor(element(by.id('correct_answer_button'))).toBeVisible().withTimeout(6000);
  	await expect(element(by.id('correct_answer_button'))).toBeVisible();
  	await expect(element(by.id('correct_answer_button').withAncestor(by.text('Use Perfecto Cloud'))));
  });

  it('should say Wrong Answer after tapping Buy 101 devices', async () => {
    await waitFor(element(by.id('wrong_answer_button1'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('wrong_answer_button1'))).toBeVisible();
    await element(by.id('wrong_answer_button1')).tap();
    await waitFor(element(by.text('Wrong Answer!!!'))).toBeVisible().withTimeout(6000);
    await device.takeScreenshot('wrong-answer-screen');
    await expect(element(by.text('Wrong Answer!!!'))).toBeVisible();
  });

  it('should say You are right after tapping Use Perfecto Cloud', async () => {
    await waitFor(element(by.id('correct_answer_button'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('correct_answer_button'))).toBeVisible();
    await element(by.id('correct_answer_button')).tap();
    await waitFor(element(by.text('You are right!!!'))).toBeVisible().withTimeout(6000);
    await device.takeScreenshot('correct-answer-screen');
    await expect(element(by.text('You are right!!!'))).toBeVisible();
  });

  it('should be able to see user name at correct answer screen', async () => {
    await waitFor(element(by.id('text_input_field'))).toBeVisible().withTimeout(6000);

    try
    {
      // text input is not always activated on some devices
     await element(by.id('text_input_field')).typeText('new perfecto user');
    }
    catch (e) {
     await element(by.id('text_input_field')).tap();
     await element(by.id('text_input_field')).typeText('new perfecto user');
    }

    try
    {
      // close keyboard iOS
      await element(by.label('Done')).atIndex(0).tap();
    }
    catch (e) {
    }

    try
    {
      // close keyboard Android
      await device.takeScreenshot('before-close-keyboard-2');
      //click android 'Back' button
      await device.sendADBInputCommand('keyevent 4');
      await device.takeScreenshot('after-close-keyboard-2');
    }
    catch (e) {
    }

    await waitFor(element(by.id('text_input_field'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('text_input_field'))).toBeVisible();
    await waitFor(element(by.text('new perfecto user'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('text_input_field'))).toHaveText('new perfecto user');
    await waitFor(element(by.id('correct_answer_button'))).toBeVisible().withTimeout(6000);
    await expect(element(by.id('correct_answer_button'))).toBeVisible();
    await element(by.id('correct_answer_button')).tap();
    await waitFor(element(by.text('You are right!!!'))).toBeVisible().withTimeout(6000);
    await expect(element(by.text('You are right!!!'))).toBeVisible();
  });
})
