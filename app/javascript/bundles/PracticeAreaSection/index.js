import React, { useState } from 'react';

function PracticeAreaSection(props) {
  const [practiceAreas, setPracticeAreas] = useState(props.practiceAreas);

  function addPracticeArea() {
    setPracticeAreas([
      ...practiceAreas,
      {
        id: null,
        title: null
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
            <input type="text" defaultValue={practiceArea.title}
              onChange={setPracticeAreaTitle}
              name="site[practice_areas_attributes][][title]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default props => <PracticeAreaSection {...props} />
