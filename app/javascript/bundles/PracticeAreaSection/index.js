import React, { useState } from 'react';

function PracticeAreaSection(props) {
  const [practiceAreas, setPracticeAreas] = useState(props.practiceAreas);

  function addPracticeArea() {
    setPracticeAreas([
      ...practiceAreas,
      {
        id: null,
        title: ''
      }
    ]);
  }

  function setPracticeAreaTitle(event) {
    const listItem = event.target.parentNode;
    const list = listItem.parentNode;
    const index = [...list.childNodes].findIndex(item => item === listItem);

    const newPracticeAreas = [...practiceAreas];
    newPracticeAreas[index].title = event.target.value;

    setPracticeAreas(newPracticeAreas);
  }

  function movePracticeAreaUp(event) {
    const listItem = event.target.parentNode;
    const list = listItem.parentNode;
    const index = [...list.childNodes].findIndex(item => item === listItem);

    const newPracticeAreas = [...practiceAreas];
    const toSwap = { ...newPracticeAreas[index] };
    newPracticeAreas[index].title = newPracticeAreas[index - 1].title;
    newPracticeAreas[index - 1].title = toSwap.title;

    setPracticeAreas(newPracticeAreas);
  }

  function movePracticeAreaDown(event) {
    const listItem = event.target.parentNode;
    const list = listItem.parentNode;
    const index = [...list.childNodes].findIndex(item => item === listItem);

    const newPracticeAreas = [...practiceAreas];
    const toSwap = { ...newPracticeAreas[index] };
    newPracticeAreas[index].title = newPracticeAreas[index + 1].title;
    newPracticeAreas[index + 1].title = toSwap.title;

    setPracticeAreas(newPracticeAreas);
  }

  return (
    <div className="field">
      <div>
        Practice Areas
        <button type="button" onClick={addPracticeArea}>Add</button>
      </div>
      <ul>
        {practiceAreas.map((practiceArea, index) => (
          <li key={index}>
            {practiceArea.id ?
              <input type="hidden"
                name="site[practice_areas_attributes][][id]"
                defaultValue={practiceArea.id} />
              : null }
            <input type="text" value={practiceArea.title}
              onChange={setPracticeAreaTitle}
              name="site[practice_areas_attributes][][title]" />
            {index === 0 ?
              <button onClick={movePracticeAreaUp}
                type="button" disabled>Move up</button>
              : <button onClick={movePracticeAreaUp} type="button">Move up</button>}
            {index === practiceAreas.length - 1 ?
              <button onClick={movePracticeAreaDown}
                type="button" disabled>Move down</button>
              : <button onClick={movePracticeAreaDown} type="button">Move down</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default props => <PracticeAreaSection {...props} />
