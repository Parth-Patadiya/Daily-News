import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import News from './components/News';
import { Component } from 'react/cjs/react.production.min';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pageSize = 15;

  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <LoadingBar
            color='#f11946'
            height = {3}
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="general" country='in' category='general' />
            } exact></Route>
            <Route path="/business" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="business" country='in' category='business' />
            } exact></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="entertainment" country='in' category='entertainment' />
            } exact></Route>
            <Route path="/health" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="health" country='in' category='health' />
            } exact></Route>
            <Route path="/science" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="science" country='in' category='science' />
            } exact></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="sports" country='in' category='sports' />
            } exact></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="technology" country='in' category='technology' />
            } exact></Route>

          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}