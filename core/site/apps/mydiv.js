import autobind from 'autobind-decorator';
console.log('???')

@autobind
class Test extends React.Component{
  render() {
    return (
      <p>salut</p>
    );
  }
};

export default Test
