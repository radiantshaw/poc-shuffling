import React, { useState } from 'react';

function PracticeAreaSection(props) {

  const [practiceAreas, setPracticeAreas] =
    useState(props.practiceAreas.map(pa => {
      return {
        ...pa,
        isDeleted: false
      }
    }));

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

  function deletePracticeArea(event) {
    const listItem = event.target.parentNode;
    const list = listItem.parentNode;
    const index = [...list.childNodes].findIndex(item => item === listItem);

    const newPracticeAreas = [...practiceAreas];
    newPracticeAreas[index].isDeleted = true
    setPracticeAreas(newPracticeAreas);
  }

  function renderHiddenAttributes(practiceArea) {
    return ( practiceArea.id ?
      <React.Fragment>
        <input type="hidden"
          name="site[practice_areas_attributes][][id]"
          defaultValue={practiceArea.id} />
        <input type="hidden"
          name="site[practice_areas_attributes][][_destroy]"
          defaultValue={practiceArea.isDeleted} />
      </React.Fragment>
    : null )
  }

  return (
    <div className="field">
      <div>
        Practice Areas
        <button type="button" onClick={addPracticeArea}>Add</button>
      </div>
      <ul>
        {practiceAreas.map((practiceArea, index) => (
          <li key={index} style={{ display: practiceArea.isDeleted? "none" : "list-item" }} >
            {renderHiddenAttributes(practiceArea)}
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
              <button onClick={deletePracticeArea}
                type="button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default props => <PracticeAreaSection {...props} />
