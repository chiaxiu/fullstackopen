const Course = ({courses}) => {
    return(
      <div>
        {courses.map(course => 
          <div key={course.id}>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
          </div>
        )}
      </div>
    )
  }
  
  const Header = ({name}) => {
    return( 
        <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id}  part={part}/>
        )}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises, 0,
    )
  
    return(
      <p>total of {total} exercises</p>
    )
  }

export default Course;