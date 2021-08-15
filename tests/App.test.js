// import { Selector } from 'testcafe';
    
// fixture `Getting Started`
//     .page `http://localhost:3000`;

// test('My first test', async t => {
//       await t
//         //   .typeText('#developer-name', 'John Smith')
//           .click('#submit-button');
//   });

// test('Submit form with all fields filled', async t => {
//     const firstName = 'Firstname';
//     const lastName = 'Lastname';
//     const email = 'example@example.com';
//     const username = 'username';
//     const password = 'password';
//     const password2 = 'password2';

//     const firstNameInput = Selector('#firstName');
//     const firstNameInputExists = firstNameInput.exists;

// const lastNameInput = Selector('#lastName');
// const lastNameInputExists = lastNameInput.exists;

// const emailInput = Selector('#email');
// const emailInputExists = emailInput.exists;

// const userNameInput = Selector('#username');
// const userNameInputExists = userNameInput.exists;

// const passwordInput = Selector('#password');
// const passwordInputExists = passwordInput.exists;

// const passwordConfirm = Selector('#confirm_password');
// const passwordConfirmExists = passwordConfirm.exists;

// await t
//     .expect(firstNameInputExists).ok()
//     .typeText(firstNameInput, firstName)
//     .expect(firstNameInput.value).eql(firstName)

//     .expect(lastNameInputExists).ok()
//     .typeText(lastNameInput, lastName)
//     .expect(lastNameInput.value).eql(lastName)

//     .expect(emailInputExists).ok()
//     .typeText(emailInput, email)
//     .expect(emailInput.value).eql(email)

//     .expect(userNameInputExists).ok()
//     .typeText(userNameInput, username)
//     .expect(userNameInput.value).eql(username)

//     .expect(passwordInputExists).ok()
//     .typeText(passwordInput, password)
//     .expect(passwordInput.value).eql(password)
//     .expect(passwordInput.length == 1)

//     .expect(passwordConfirmExists).ok()
//     .typeText(passwordConfirm, password2)
//     .expect((await passwordConfirm.value).length).eql(1)

//     .click('#submit')
//     .expect(Selector('#help').innerText).eql("Fill out the form")
//     .expect(Selector('#success').innerText).eql("Registration request submitted successfully")    
// });