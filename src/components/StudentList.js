
import React, { useEffect, useState } from "react";
import { List, Image } from "semantic-ui-react";
import { FormControl, Accordion, ListGroup } from "react-bootstrap";
import Axios from "axios";
import '../App.css'
import Tag from "./Tag/Tag";
export default function StudentList() {
  // Hooks used
  const [studentData, setStudentData] = useState([])
  const [search, setSearch] = useState("");

  // Sets hooks upon page load
  useEffect((e) => {
    async function fetchData() {
      // Get student information
      const response = await Axios.get(`https://api.hatchways.io/assessment/students`);
      const data = response.data;
      setStudentData(data.students);
    }
    fetchData();
  }, []);

  // gives average of all grades
  function average(nums) {

    return nums.reduce((a, b) => (a + b)) / nums.length * 100;
  }

  // console.log(studentData.map((val, i) => {
  //   return (

  //   )
  // }));
  /**
* Determine if row is included in search bar query
* @param {Object} val Represents a row in the table
*/
  function inSearch(val) {
    if (search === "") {
      return val
    } else if (val.firstName.toLowerCase().includes(search.toLowerCase()) || val.lastName.toLowerCase().includes(search.toLowerCase())) {
      console.log(val.langPair);
      return val
    }
  }

  return (
    <>
      <FormControl
        type='text'
        size="lg"
        placeholder='Search By Name'
        className='searchCSS'
        onChange={(e) => {
          const searchVal = e.target.value;
          setSearch(searchVal);
        }}
      />
      {/* Maps over all student data */}
      <div className="queryList1">
        {studentData.filter((agl) => {
          if (inSearch(agl)) {
            return agl;
          } else {
            return false;
          }
        }).map((sd) => {
          return (
            <>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0"></Accordion.Item>
                <Accordion.Header >
                  <div className='mainCSS'>
                    <Image
                      className='imgCSS'
                      size='medium'
                      circular src={sd.pic} />
                    <List className='listDiv'>
                      <List.Content>
                        <h1 className="mainHeader">{sd.firstName} {sd.lastName}</h1>
                        <p>Email: {sd.email}</p>
                        <p>Company: {sd.company}</p>
                        <p>City: {sd.city}</p>
                        <p>Skill: {sd.skill}</p>
                        <p>Average: {average(sd.grades)}%</p>
                        <Tag />
                      </List.Content>
                    </List>
                  </div>
                </Accordion.Header>
                <Accordion.Body>

                  {sd.grades.map((grades, i) =>
                    <ListGroup>
                      <ListGroup.Item>
                        <p>Test {i + 1}   {grades}%</p>
                      </ListGroup.Item>
                    </ListGroup>
                  )}

                </Accordion.Body>
              </Accordion>
            </>
          )
        })}

      </div>

    </>
  );
};
