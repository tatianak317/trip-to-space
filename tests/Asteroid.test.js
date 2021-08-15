import { wait } from '@testing-library/dom';
import { Selector } from 'testcafe';

fixture `Asteroid Page`
    .page `http://localhost:3000/asteroid`;

test('element test', async t => {
    const title = Selector('#title'); 
    const titleExists = title.exists; 

    const pictureName = Selector('#picture-name');
    const pictureNameExists = pictureName.exists;

    const picture = Selector('.image'); 
    const pictureExists = picture.exists; 

    const submitDate = Selector('.submit');
    const submitDateExists = submitDate.exists; 

    const startDate = Selector('#startDate');
    const startDateExists = startDate.exists;
    const date = "2021-06-23";

    const endDate = Selector('#endDate');
    const endDateExists = endDate.exists;
    const date2 = "2021-06-25";

    const dateNum = 3; 

    const asteroidDates = Selector('.date')
    const asteroidDatesExists = asteroidDates.exists;    

    const asteroid = Selector('.asteroid')
    const asteroidExists = asteroid.exists;  


await t 
    .expect(titleExists).ok()

    .expect(pictureNameExists).ok()

    .wait(1000)

    .expect(pictureExists).ok()

    .expect(startDateExists).ok()
    .typeText(startDate, date)
    .expect(startDate.value).eql(date)

    .expect(endDateExists).ok()
    .typeText(endDate, date2)
    .expect(endDate.value).eql(date2)

    .expect(submitDateExists).ok()
    .click(submitDate)

    .wait(1000)
    .expect(asteroidDatesExists).ok()
    .expect(asteroidExists).ok()
    
    .expect(asteroidDates.count).eql(dateNum)
    
});