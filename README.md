# React + Redux

Welcome to the React + Redux workshop. The stated purpose of this workshop to get you up to speed on building apps using React and Redux, two of very useful tools to have in your toolbox. We'll be using a few other tools during this workshop but these will be largely be glossed over since they're not the focus of the workshop. Plus, thanks to [create-react-app][cra] these tools are mostly hidden from you anyway.

## Prerequisites

- Have [node.js][node] 4+ installed
- Have a solid foundation in JavaScript
- ES6 experience is nice but not required

## Why Listen to Me

My name is Brian Holt and I used to work at Netflix as a UI engineer mostly writing React and Node. Previously I worked at reddit where I launched [reddit's first React code][reddit-react]. I've been writing React for nearly 4 years which is pretty much eternity when it comes to React: it's only been public since March 2013. Luckily for you, I've run into a lot of pitfalls with React and I'm happy to share my experience with you about methods of development that I found useful.

## Let's Write React. Right Now.

Open a new file (anyway, doesn't matter; maybe on your desktop) and call it `whatever-you-want.html`. Put the following markup in there:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div id="root">nothing rendered yet</div>
  <script src='https://unpkg.com/react@16.0.0/dist/react.min.js'></script>
  <script src='https://unpkg.com/react-dom@16.0.0/dist/react-dom.min.js'></script>
  <script>
    // code goes here
  </script>
</body>
</html>
```

We are now ready to write some Reacts. We're including both React and ReactDOM from unpkg (thanks Michael Jackson, author of React Router.) These two packages are required to React up and going. React is the package common amongst React (for web,) React Native, A-Frame React (for WebVR,) React-Blessed (for CLI,) etc. It's the basic architecture of React; it has no concept of how to render itself, only how to create new components. ReactDOM is what takes the components we're about to create and actually renders them out to the DOM. It's the connecting layer between the code and the actual view.

Okay, open this page in a browser. `File >> Open` and then select the file and open it should work. You should see `nothing rendered yet`. Put the following code into the open script tag:

```javascript
var markupExample = React.createElement('h1', {}, 'lolol')
ReactDOM.render(markupExample, document.getElementById('root'))
```

The hello world of React. Here we've created an h1 with the text of 'lolol' and rendered it out to the DOM. Cool. The empty object are the attributes being passed to the div. If you give a property of `{id: 'my-h1'}` the rendered component will be `<h1 id='my-h1'>lolol</h1>`.

The ReactDOM stuff is taking your top level element (we'll be making more very shortly) and puts inside of some DOM element which we grab with `getElementById`. Let's do some nesting!

```javascript
// replace everything in the script tag so far
var markupExample = React.createElement('div', {},
  React.createElement('h1', {}, 'My Favorite Cites to Visit'),
  React.createElement('ul', {},
    React.createElement('li', {}, 'Tel Aviv'),
    React.createElement('li', {}, 'Reykjavik'),
    React.createElement('li', {}, 'Amsterdam'),
    React.createElement('li', {}, 'Rome'),
    React.createElement('li', {}, 'Hong Kong')
  )
)

ReactDOM.render(markupExample, document.getElementById('root'))
```

Here we are making some nested markup. This is the way to do with React. You can write as many children as you need; just separate with commas. Or use an array. Either works. Let's make this a tiny bit more readable.

```javascript
// replace the codes again
const ce = React.createElement
var markupExample = (
  ce('div', {},
    ce('h1', {}, 'My Cities to Visit'),
    ce('ul', {},
      ce('li', {}, 'Tel Aviv'),
      ce('li', {}, 'Reykjavik'),
      ce('li', {}, 'Amsterdam'),
      ce('li', {}, 'Rome'),
      ce('li', {}, 'Hong Kong')
    )
  )
)

ReactDOM.render(markupExample, document.getElementById('root'))
```

This makes it so you don't have to write `React.createElement` a bunch of times.

We also use `()` to put `div` on its own line. This makes the indentation line up as you would expect it to. It's for readability.

Let's try adding some styling.

```javascript
// replace <li>
ce('li', {style: {color: 'red'}}, 'Tel Aviv'),
ce('li', {style: {color: 'mediumspringgreen'}}, 'Reykjavik'),
ce('li', {style: {color: 'rebeccapurple'}}, 'Amsterdam'),
ce('li', {style: {color: 'peru'}}, 'Rome'),
ce('li', {style: {color: 'darkslate'}}, 'Hong Kong')
```

To change styles in React, we're operating on the style object which is how you do it in JavaScript anyway. But this is how you add properties to a component in React. Okay, since is a bit verbose; let's try to not repeat ourselves so much.

```javascript
// replace everything in script tag
var FavoriteCity = () => {
  return (
    ce('li', {style: {color: 'red'}}, 'House of Cards')
  )
}

var App = () => (
  div({},
    h1({}, 'My Favorite Cities to Visit'),
    ul({},
      ce(FavoriteCity, {}),
      ce(FavoriteCity, {}),
      ce(FavoriteCity, {}),
      ce(FavoriteCity, {}),
      ce(FavoriteCity, {})
    )
  )
)

ReactDOM.render(markupExample, document.getElementById('root'))
```

So now we have a component called FavoriteCity that is being used in another component. FavoriteCity is called a _composite component_, or a component we've made comprised of other components. But this is less useful than it was before: we only have one show now with one color. Let's fix that.

```javascript
// replace render in FavoriteCity
var FavoriteCity = () => {
  return (
    li({style: {color: this.props.titleColor}}, this.props.titleName)
  )
}

// replace <li>s
ce(FavoriteCity, {titleColor: 'peru', titleName: 'Tel Aviv'}),
ce(FavoriteCity, {titleColor: 'rebeccapurple', titleName: 'Reykjavik'}),
ce(FavoriteCity, {titleColor: 'lawngreen', titleName: 'Rome'}),
ce(FavoriteCity, {titleColor: 'mediumspringgreen', titleName: 'Amsterdam'}),
ce(FavoriteCity, {titleColor: 'thistle', titleName: 'Hong Kong'})
```

Okay, this is looking more useful. We have a flexible component that we can give properties from parent (`App`) to the child (`FavoriteCity`). Note that `FavoriteCity` cannot modify that state; it can only read from that. Only the parent can decide which props to give the child; the child just had to deal with it. This is an important concept in React that we'll continue to explore. Let's do one more thing before we add JSX. What if we want to make it so we can click the links and they would toggle if they were bolded or not?

```javascript
class FavoriteCity extends React.Component {
  constructor {
    this.state = {
      fontWeightState: 'bold'
    }
  }
  render () {
    return (
      li(
        {
          style: {
            fontWeight: this.state.fontWeightState,
            color: this.props.titleColor
          }
        },
        this.props.titleName
      )
    )
  }
}
```

Try playing with the initial value of fontWeightState. You'll see that each component has its own state. We are then free to play with that state. Also notice I'm calling the state variable `fontWeightState`: this is a terrible name since it's redundant. However I wanted to show you there's no magic names here: name these variables whatever you want. Let's make it so it toggles boldness back and forth.

```javascript
class FavoriteCity extends React.Component {
  constructor {
    this.state = {
      fontWeightState: 'bold'
    }
  }
  toggleFontWeight () {
    var fontWeightState = (this.state.fontWeightState === 'bold') ? 'normal' : 'bold'
    this.setState({fontWeightState})
  }
  render () {
    return (
      li(
        {
          onClick: this.toggleFontWeight,
          style: {
            fontWeight: this.state.fontWeightState,
            color: this.props.titleColor
          }
        },
        this.props.titleName
      )
    )
  }
}
```

This is how you make the components respond to interaction. And notice that state is mutable via the `setState` API. State is mutable (can be changed) while props are immutable (cannot be changed.) We give it an onClick property which points to a method we want to call once that particular event happens. There's also onSubmit, onChange, etc. Notice all we have to do is setState and then React will handle the rest: it'll kick off a re-render and update the DOM for you. We just have to tell React "Given these states and props, our component will look like this." That's what rad about React: we just have to tell it what to look like for a given set on inputs. You don't have to reason any more about it than that. Also, it's cool that each component is managing its own state: some can be bolded and some not.

Okay, this syntax is manageable for React, but there's a better way. This gets unruly in big apps. Let's move to JSX

## JSX

JSX is a tiny extension to JavaScript specifically for React (though other frameworks like [deku][deku] use it too.) It let's you add "XML-like syntax" to your JavaScript. In other words, you can write HTML directly in your JavaScript. This sounds gross and nasty and one definitely one of the reasons people get turned off React. This is why I showed you how to write React without a build step first. Now you've seen what it's like to write React without JSX: let me show how adding the JSX HTML syntax can make your code easier to read and maintain.

Add the following script tag above your other script tags.

```html
<script src='https://unpkg.com/@babel/standalone@7.0.0-beta.4/babel.min.js'></script>
```

Change the opening script tag of your code block from `<script>` to be

```html
<script type='text/babel'>
```

This is an in-browser transform of your code to allow you to use ES6 and JSX directly in your browser. It will transpile everything for you in the browser and then eval it. This is obviously very slow and something you *never* want to do in production. The library will select any script tag with the type 'text/babel'. It then transform it with some presets which include the React transforms.

So let's go try it converting one of our components to use JSX (you can mix the two syntaxes, we don't have to do it all at once.)

```javascript
// replace FavroiteCity render
render () {
  return (
    <li onClick={this.toggleFontWeight} style={{fontWeight: this.state.fontWeightState, color: this.props.titleColor }}>
      {this.props.titleName}
    </li>
  )
}
```

It looks like HTML, right? Whenever you see the `{}` inside of JSX, it means that a JavaScript expression comes between them. For example, we could say `{this.props.titleName.toUpperCase()}` and that would totally work. For the style attribute, notice the two sets of `{}`. The outer set are for the JS expression denotation. The inner set are for the JavaScript object notation for the styles. That's it! Let's convert the markupExample.

```javascript
var App = () => (
  <div>
    <h1>My Favorite Cities to Visit</h1>
    <ul>
      <FavoriteCity titleColor='peru' titleName='House of Cards' />
      <FavoriteCity titleColor='rebeccapurple' titleName='Jessica Jones' />
      <FavoriteCity titleColor='lawngreen' titleName='Stranger Things' />
      <FavoriteCity titleColor='thistle' titleName='Daredevil' />
      <FavoriteCity titleColor='mediumspringgreen' titleName='Bojack Horseman' />
    </ul>
  </div>
)
```

Even cleaner, right? Really easy to quickly digest, just like JSX. Anything with a lowercase letter is going to be literally that tag output to the DOM (like `div` and `ul`) and anything uppercase will be a composite component (like `FavoriteCity`). This is an enforced convention. You must do it this way.

So, now we have the basics of React down. Let's move on to making our app.

## create-react-app

We just used babel-standalone to do JSX transformations in-browser. This is obviously untenable for anything you intend people to use. We're going to use a tool to jumpstart our build process.

[create-react-app][cra] is a shiny new piece of tech that was made because of feedback from the React community. Many people complained that it's tough to get up and running with React. There are few disparate tools that weren't necessarily designed to work together that you need to know to pipe together. The React team (in a hack day) decided to thoughtfully curate a good beginner stack that has zero config to help beginners get started.

Under the hood create-react-app uses Webpack, Babel, ESLint, and Jest in addition a to a few other pieces of glue. The key here is that *create-react-app is not configurable*. This is by design. You cannot customize the ESLint rules. You cannot customize the Babel plugins. You cannot customize the Webpack configuration. Again, this is by design. People expecting to this be customizable quickly get frustrated. The point of this project is not to be the ember-cli: the Swiss Army Knife tool everyone uses on every project. It's to get you up and running instantly without any overhead.

If you read the preceding paragraph and felt fearful of getting locked-in with such a tool, you are absolutely not alone. Thankfully the authors had the good sense to borrow the eject idea from [enclave][enclave]. Once you're done with create-react-app, you run `npm run eject` and the project will output all of its configs for ESLint, Webpack, Babel, Jest, and then remove itself from the project. This is great because you can start with create-react-app and know once you hit the final wall of having to configure your tools, you have the escape hatch. You're not locked in. This is a one-way-process; once you've ejected, the only way to go back would be be a painful by-hand process.

Let's use create-react-app to generate our project now.

- Run `npm install --global create-react-app`
- Navigate to the parent directory where you want to create the new folder for your app
- Run `create-react-app adopt-me`

Navigate into the directory. We now have all the tools in place to get our app going. create-react-app provides a little landing page to make sure everything is working. Run `npm run start` from within the adopt-me directory. It should start the Webpack dev server for you and open your browser to port 3000. This server has hot module reload built in! No config from you. Pretty cool. Every time you save, your code will get transpiled and reloaded in the browser without you doing anything.

If you look at your package.json, you'll see they've included React, ReactDOM, and react-scripts for you. react-scripts is what's taking care of all the server, transpilation, linting, and testing for you.

All the code you write is going to go in the `src` directory. We're going to put all our files here.

Check out `public`. All your statically served assets will come from here.

So let's get started. Delete logo.svg. Delete all the CSS. Don't need to delete App.js or index.js but we're going to rewrite everything inside of them. You're also going to need to grab some source files from me: the API client and the CSS for the project. Grab [these files][project-files] and put them all in the src directory. You'll also need to `npm install --save jsonp` to make the API client work.

If you have not already, go sign up for a dev account with [Petfinder][petfinder]. You're going to need credentials to be able to make requests to Petfinder. Once you have your key and secret, create a file called credentials.js and put this in there:

```javascript
export default {
  key: "<your key here>",
  secret: "<your secret here>"
}
```

## React (without Redux)

Open App.js. Delete everything. Let's start building our app! Put the following in there:

```javascript
import React from 'react'

class App extends React.Component {
  render () {
    return (
      <h1>hi lolol</h1>
    )
  }
}

export default App
```

Open index.js and put this in there:

```javascript
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './reset.css'
import './style.css'

render(<App />, document.getElementById('root'))
```

You should now see a green background with 'hi lolol' on there. Cute. So let's actually get something interesting on the page!

In App.js, put the following:

```javascript
import React from 'react'
import credentials from './credentials'
import petfinder from './petfinder-client'
const pf = petfinder(credentials)

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      animal: 'dog',
      breed: 'Havanese',
      location: 'San Francisco, CA',
      pets: []
    }
  },
  componentDidMount () {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
      const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
      this.setState({pets})
    })
  },
  render () {
    return (
      <div className='app'>
        <img src='src/adopt-me.png' alt='adopt-me logo' />
        <div>
          <pre><code>{JSON.stringify(this.state, null, 4)}</code></pre>
        </div>
      </div>
    )
  }
}

export default App
```

- Instantiate our API client. We have to give it credentials to be able make requests.
- constructor we're going to set some defaults for what kinds of animals we're going to request
- componentDidMount is one of the React lifecycle methods. This particular one runs right after the component gets put onto the DOM. This means it will render once before this method gets run. If you notice when we load the page, pets is an empty array, then it populates. This is what you want. You want render something and then make the user wait for the data to come in. It makes your page feel faster. componentDidMount is the place for AJAX, adding event listeners, interfacing with other libraries like jQuery, etc. componentDidMount does **not** get run in node environments.
- There is also componentWillMount if you need to do something in both Node and in the browser, or before something gets put onto the DOM. This is rare. componentWillUnmount is for cleaning up when a component will leave the DOM. Usually this is for cleaning up setIntervals, event listeners, and anything that would cause a memory leak. There's also componentWillReceiveProps but we'll talk about that when we need it.
- You should see the data you get back from the API. Let's go make it display something!

```javascript
// replace <pre><code> block
{this.state.pets.map((pet) => (
  <h1>{pet.name}</h1>
))}
```

- We're using the "ng-repeat" of the React here for the first time: JavaScripts Array.prototype.map function. Since you know how React creates its components (function calls,) we're just creating an array of components to pass in as a component.
- Here we're just displaying the names of all the dogs.
- You'll notice an error in the console with React complaining that it needs a key. Since we're creating a bunch of sibling elements that are the same type of tag, React wants a unique key attribute for each so it can optimize the re-renders of those elements. We'll fix it later but just so you know that's expected for now.
- So let's go make a Pet component that displays each animal nicely.

```javascript
// in a new file, Pet.js
import React from 'react'
const MAX_DESCRIPTION_LENGTH = 150

class Pet extends React.Component {
  render () {
    const photos = this.props.pet.media ? this.props.pet.media.photos.photo.reduce((acc, photo) => {
      if (photo['@size'] === 'pn') {
        acc.push(photo.value)
      }
      return acc
    }, []) : []
    const description = this.props.pet.description || ''
    return(
      <div className='pet'>
        <div>
          {photos.map((photo, index) => (
            <img key={photo} alt={`${this.props.pet.name} number ${index+1}`} src={photo} />
          ))}
        </div>
        <ul>
          <li>{this.props.pet.name}</li>
          <li>{this.props.pet.animal} : {Array.isArray(this.props.pet.breeds.breed) ? this.props.pet.breeds.breed.join(', ') : this.props.pet.breeds.breed  }</li>
          <li>{this.props.pet.age}</li>
          <li>{this.props.pet.contact.city}, {this.props.pet.contact.state}</li>
        </ul>
        <p>{description.substring(0, MAX_DESCRIPTION_LENGTH)}{description.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}</p>
      </div>
    )
  }
}

export default Pet
```

- For the photos array, we're just selecting the right size of photos. Petfinder sends several sizes through.
- Some of the descriptions are mega long. 150 characters seemed like a good enough amount characters. We only want to show the ellipses ("...") if we actually do truncate the string.
- Other than that it's pretty much all just getting all the structure on the page!
- Now go to App.js.

```javascript
// at the top
import Pet from './Pet'

// replace <h1> inside the map in render
<Pet key={pet.id} pet={pet} />
```

- Just using our newly created component! We give it a key (the id) so we avoid that console error.
- Let's make it so we can search for other pets!

```javascript
// make new file called SearchControls.js
import React from 'react'
import petfinder from './petfinder-client'
const pf = petfinder()

class SearchControls extends React.Component {
  state = {
    breeds: []
  }
  componentDidMount () {
    this.getNewBreeds(this.props.animal)
  },
  getNewBreeds (animal) {
    pf.breed.list({animal})
      .then((data) => {
        if (data.petfinder.breeds) {
          this.setState({breeds: data.petfinder.breeds.breed})
        }
      })
  },
  handleBreedChange (e) {
    this.props.changeBreed(e.target.value)
  },
  render () {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        {this.state.breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    )
    return (
      <div className='search'>
        {breedSelector}
      </div>
    )
  }
}

export default SearchControls
```

- We don't have to give petfinder credentials again since we already did once. It's dumb. I know.
- We're going to make SearchControls own the management of breeds information. We make a request for breeds based on the animal on mount of the component. That's what getNewBreeds is for.
- handleBreedChange is for when someone selects a new breed. We need to let the parent know the user changed breeds since that state has to reside in the parent since it uses the breed to request new batches of data. That's what the changeBreed method that the parent will pass in.
- We need to account for if no breeds are there. On first render there will be no breeds. That's why we have the ternary to set the breedSelector to null if there are no breeds yet.
- Let's go implement it in the parent.

```javascript
// imports at the top
import SearchControls from './SearchControls'

// replace componentDidMount, add method
componentDidMount () {
  this.search()
},
search () {
  const { animal, breed, location } = this.state
  const promise = pf.pet.find({animal, breed, location, output: 'full'})
  promise.then((data) => {
    const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
    this.setState({pets})
    console.log(data)
  })
},
changeBreed (breed) {
  this.setState({ breed }, () => this.search())
},


// add to render, below <img> tag
<SearchControls breed={this.state.breed} animal={this.state.animal} changeBreed={this.changeBreed} />
```

- We moved search out into its own method. We need to call it on mount and then we also must call it every time the breed changes. This way we can reuse the same method in componentDidMount and whenever we need to search again.
- We need to create a method to change breed. We can now pass this to whatever child components need to update breed. We have exactly one way to change the breed, this method. This cuts down on where bugs can be and also lets us be a bit more DRY.
- Notice we're giving a callback to setState. setState does not instantly change the state; it schedules it to be changed. It then often gets changed within milliseconds so it's not a big deal but if you call setState and then _immediately_ try to access that state, it's going to usually be the old state. Thus what you can do is you can give setState a callback that it will call after it can guarantee the new state has landed. In this case we just want it to call search with the new parameters, hence the short function.
- Pass all the necessary info to SearchControls and now we should be able to switch breeds!
- Let's make it so we can change animals too.

```javascript
// import ANIMALS too
import petfinder, { ANIMALS } from './petfinder-client'

// new methods for the component
componentWillReceiveProps (nextProps) {
  if (nextProps.animal && nextProps.breed !== this.props.animal) {
    this.getNewBreeds(nextProps.animal)
  }
},
handleAnimalChange (e) {
  this.props.changeAnimal(e.target.value)
},

// add about {breedSelector}
<select value={this.props.animal} onChange={this.handleAnimalChange}>
  <option value=''></option>
  {ANIMALS.map((animal) => (
    <option key={animal} value={animal}>{animal}</option>
  ))}
</select>
```

- The petfinder client exports a list of available animals. We'll use that in our dropdown.
- componentWillReceiveProps is another lifecycle method for React. Every time the component is going receive different props than it had before, it will call this method. In this case, every time a new animal is passed down, we want to get the correct breeds for it. So any time that the previous breed is not equal to the new one, we need to request a new set.
- Let's go make our changes to App.js

```javascript
// add changeAnimal method
changeAnimal (animal) {
  this.setState({animal, breed: ''}, () => this.search())
},

// pass down changeAnimal
<SearchControls
  breed={this.state.breed}
  animal={this.state.animal}
  changeBreed={this.changeBreed}
  changeAnimal={this.changeAnimal}
/>
```

- Only interesting thing is that we're setting the breed to be empty string when we change animal. Obviously we don't want a German Shepard cat, so that makes sense.
- Let's make it so you can keep a list of favorites so you can browse the selection and keep a list of a few animals you may want to adopt. We're going to abstract out our list of pets in a PetList component and then use that for both our search results and our favorites. Create a new file called PetList.js

```javascript
// PetList

import React from 'react'
import Pet from './Pet'

class PetList extends React.Component {
  render () {
    let pets
    if (this.props.pets.length > 0) {
      pets = this.props.pets.map((pet) => {
        return (
          <Pet
            key={pet.id}
            pet={pet}
          />
        )
      })
    } else {
      pets = <h2>list is empty</h2>
    }
    return (
      <div className='petlist'>
        <h1>{this.props.title}</h1>
        <div>
          {pets}
        </div>
      </div>
    )
  }
}

export default PetList
```

- Not too different from what was already there. Now it will say "list is empty" if there are no results but that's it.
- Let's make it so you can favorite items from within a Pet.

```javascript
// add to Pet component
handleFavoriteChange () {
  console.log(this.props.pet)
  this.props.toggleFavorite(this.props.pet, !this.props.favorite)
},

// before the photos in the render
<input type='checkbox' checked={this.props.favorite} onChange={this.handleFavoriteChange} />
```

- We added a checkbox to signify if this item has been favorited or not. We also added a method to handle those event changes. Let's go create that method in App.js.

```javascript
// add to the initial state
favorites: []

// add method to the component
toggleFavorite (pet, toAdd) {
  let { favorites } = this.state
  favorites = toAdd ? favorites.concat(pet) : favorites.filter((current) => pet.id !== current.id)
  this.setState({favorites})
},

// update the PetList
<PetList
  favorites={this.state.favorites}
  pets={this.state.pets}
  toggleFavorite={this.toggleFavorite}
  title={'Search Results'}
/>
```

- Nothing too new here. Let's go thread through the changes from PetList to Pet.

```javascript
// Replace the creation of the pets list
pets = this.props.pets.map((pet) => {
  const isFavorite = this.props.favorites.findIndex((favorite) => favorite.id === pet.id) > -1
  return (
    <Pet
      favorite={isFavorite}
      toggleFavorite={this.props.toggleFavorite}
      key={pet.id}
      pet={pet}
    />
  )
})
```

- Now we should be able to load the page and click the checkbox if it's favorited or not. This will add it to our favorites list in our state. What's cool about this is that we can reuse our PetList as-is to display the Favorites. In App.js:

```javascript
// beneath the existing PetList, so you'll have two PetLists
<PetList
  pets={this.state.favorites}
  favorites={this.state.favorites}
  toggleFavorite={this.toggleFavorite}
  title={'Favorites'}
/>
```

- Our favorites list just works! We were able to leverage the same component to get two functionalities done! So cool. If you architect your components correctly you can get achieve a lot of these sorts of wins.

## Jest Testing

Maybe?

## Redux

Our app works well as-is. In fact, for this size of app, _don't use Redux_. Redux is useful because it centralizes all of your state which is really great if you have a big app with lots of cross-component state concerns. When that happens, your root components end up managing a lot of your state, meaning you more or less end up with a central point of state anyway. Redux externalizes that state and makes it so you don't have to thread pieces of state throughout your app. So, again, we're refactoring to include Redux to demonstrative purposes. _This is not a good use case._

So, let's discuss how Redux works. Redux is very Flux-like for those of you have done Flux before but it isn't totally Flux. With Redux, you have one store and in that store you have a large tree of data. When something wants to modify that data, it fires off an action with some data. The action arrives at the root reducer. A reducer is a function that takes in a state tree, an action, and some data. It takes then modifies that tree in some way and returns a new tree of data. It's key to note this is a pure function: we need to be able to predicatably run these reducers so they operate the same way every time given the same input. They become trivial to test at that point.

You'll need to install `npm --save install redux redux-thunk react-redux`. Let's move breed and animal to Redux.

So let's build our store. Create a file called store.js.

```javascript
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)

export default store
```

- Here we're creating a Redux store. Every app has one Redux store.
- The way you create a Redux store is by passing in the root reducer. For those familiar with Flux terminology, the root reducer is basically the dispatcher. The difference here is that the root reducer and any other reducer are the same sort of thing. A root reducer is just going to delegate to other reducers.
- Let's go make our first reducer! Make a file called actions.js.

```javascript
export const SET_BREED = 'SET_BREED'
```

- Here we're going to keep track of our action types. When we dispatch an action, we assign a type to it which determines which reducer we delegate to. We keep these special strings here so they're all in one place.
- If we ever decide to change the name of these actions, it becomes easy to refactor it.
- Make a new file called reducers.js

```javascript
import { SET_BREED } from './actions'

const setBreed = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {breed: action.breed})
  return newState
}

const rootReducer = function (state, action) {
  // init state
  if (!state) {
    state = {
      breed: 'Havanese'
    }
  }

  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action)
    default:
      return state
  }
}

export default rootReducer
```

- We're creating two reducers here: rootReducer and setBreed. rootReducer will delegate to setBreed any time the SET_BREED action is dispatched.
- With Redux, in addition to the actions you expect (like SET_BREED) you need to provide for two other cases:
    - You need to initialize your store. Redux will call your rootReducer once on initialization.
    - You need to provide for cases where you don't recognize the action. If you don't recognize the action, just return the state you were passed in. Redux will actually send an unknown action on initialization to test that you do this correctly.
- Notice that in setBreed, we're creating a new object. That's because Redux does a simple equality check (===) to see if objects change. If you don't make a new object, it won't rerender your app.
- Now let's go make App consume Redux as our source of truth instead of React's state.

```javascript
import { Provider, connect } from 'react-redux'
import store from './store'

// delete breed from getInitialState
// delete changeBreed

// change search to use this.props.breed
// change SearchControls to take this.props.breed
// change PetList to take this.props.breed
// delete changeBreed from PetList

const ConnectedApp = connect(mapStateToProps)(App)
const ProvidedApp = (props) => <Provider store={store}><ConnectedApp /></Provider>


export default ProvidedApp
```

- State now comes from Redux so we can drop all the React state management of it.
- redux-react is a library made to connect Redux and React together. Whenever your state changes in Redux, it will let know React what happened and make it update. That's where mapStateToProps comes from. It takes a pieces of state that come from Redux and injects them as props to your component. In this case we're interested in the breed property from Redux, so we make mapStateToProps pull out breed and inject that into React like so.
- We then use the connect method to make those props auto inject those into App. That's what ConnectedApp is.
- Your top most component must be wrapped in the Provider component from react-redux in order for connect to work. This is how it passes around that information seamlessly to you. This is sort of an awkward to do it but it works for our small app.
- We've broken our ability to change the breed. Let's go make SearchControls talk to Redux instead of trying to call a parent to tell it to change state. Create a file called actionCreator.js

```javascript
import { SET_BREED } from './actions'

export function setBreed (breed) {
  return { type: SET_BREED, breed }
}
```

- All action creators need to do is take an the appropriate data and then dispense the correct action which the reducer will take care of. We're just returing the correctly shaped action object. Here is also where you do things AJAX requests (an async action) but since this one is synchronous we don't have to do too much here. Let's go wire it up in SearchControl.

```javascript
// import at top
import { setBreed } from './actionCreators'

// replace handleBreedChange
handleBreedChange (e) {
  this.props.dispatch(setBreed(e.target.value))
},

// at the bottom, replace export
export default connect(mapStateToProps, mapDispatchToProps)(SearchControls)
```

- Here we're piggybacking on the connect we already have; now we're just injecting the action creator to be able to update breed! So now we can modify breed but it won't do anything since it doesn't have a way to call search from React. So now we're in this half-state where some of our state is in React and some is in Redux; this is a bad place to be! Let's get to moving everything to Redux. Let's move animal to Redux. I usually start by creating the action. In actions.js

```javascript
export const SET_ANIMAL = 'SET_ANIMAL'
```

In reducers.js

```javascript
// imports
import { SET_BREED, SET_ANIMAL } from './actions'

// add reducer
const setAnimal = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {animal: action.animal, breed: ''})
  return newState
}

// add default value, switch statement
const rootReducer = function (state, action) {
  // init state
  if (!state) {
    state = {
      pets: [],
      animal: 'dog',
      breed: 'Havanese'
    }
  }

  switch (action.type) {
    case SET_BREED:
      return setBreed(state, action)
    case SET_PETS:
      return setPets(state, action)
    case SET_ANIMAL:
      return setAnimal(state, action)
    default:
      return state
  }
}
```

In actionCreators.js

```javascript
// import action
import { SET_BREED, SET_ANIMAL } from './actions'

// create action creator
export function setAnimal (dispatch, animal) {
  return { type: SET_ANIMAL, animal }
}
```
 
In SearchControls.js
 
```javascript
// import setAnimal
import { setBreed, setAnimal } from './actionCreators'

// replace handleAnimalChange
handleAnimalChange (e) {
  this.props.dispatch(setAnimal(e.target.value))
},

// mapState and mapDispatch
const mapStateToProps = function (state) {
  return {
    breed: state.breed,
    animal: state.animal
  }
}
```

- Cool, now SearchControls is reading and writing animal to Redux. We could make App.js respect that animal comes from Redux (same way we did with breed) but let's just make search and pets live in Redux and save ourselves some refactoring. In actions.js

```javascript
export const SET_PETS = 'SET_PETS'
```

In reducers.js

```javascript
// import at top
import { SET_PETS, SET_BREED, SET_ANIMAL } from './actions'

// new reducer
const setPets = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {pets: action.pets})
  return newState
}

// new default state line
pets: [],

// new case in switch
case SET_PETS:
  return setPets(state, action)
```
 
 In store.js
 
 ```javascript
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(reduxThunk))

export default store
 ```
 
- Okay, so here we need to introduce a Redux middleware. We need to introduce it so we can asynchronous actions. So far all of our actions have synchronous; that is to say, we called the action and it immediately happened. But with search it's async: we call search, it makes a network request, and then it fires an action we just created: SET_PETS. That's where our middleware comes in: redux-thunk.
- There are a few ways to do async in Redux: you can do it how we were doing it: make the request in React and then dispatch a sync action to Redux. In our case, we want to contain our data actions to Redux. The most popular options to do it in async are redux-thunk, redux-saga, redux-observable, or redux-promise.
- We're going to use redux-thunk. redux-thunk allows you to return a _function_ instead of an _object_. Redux will allows you do to async action inside that function and then later dispatch the results as an action. This is the simplest way to get started with Redux async actions. It's sufficient for most.
- Redux has other middlewares like one to hookup to devtools or to log out all actions. They are bits of code that get run after the action is dispatched but before the reducer to augment Redux's capabilities.
- Thunk is what I like to call a fancy-stupid word: because it has a weird name it seems unapproachable but in reality it's not too complicated. If I have `var x = function() { return 5 }` then x is a thunk. It's a function that returns a value. In this case it's extra work that's dumb, but it's cool because I can pass around x and then decide later what the value of x is going to be. It's way of lazy/async/deferred evaluation.
- In actionCreators.js

```javascript
// imports
import petfinder from './petfinder-client'
import credentials from './credentials'
import { SET_PETS, SET_BREED, SET_ANIMAL } from './actions'
const pf = petfinder(credentials)

// new action creator
export function search () {
  return function (dispatch, getState) {
    const state = getState()
    const { breed, animal, location } = state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
      const pets = data.petfinder.pets ?  data.petfinder.pets.pet : []
      dispatch({ type: SET_PETS, pets })
    })
  }
}
```

- Notice we return a function instead of our typical object. This function takes in dispatch and getState as params. Then we take that state and make our request, get the data, and dispatch that data to the store. Cool! Let's go make it work in SearchControls.js.

```javascript
// import action creator
import { setBreed, setAnimal, search } from './actionCreators'

// dispatch search in componentDidMount, handleAnimalChange, and handleBreedChange
componentDidMount () {
  this.props.dispatch(search())
  this.getNewBreeds(this.props.animal)
},
handleAnimalChange (e) {
  this.props.dispatch(setAnimal(e.target.value))
  this.props.dispatch(search())
},
handleBreedChange (e) {
  this.props.dispatch(setBreed(e.target.value))
  this.props.dispatch(search())
},
```

- Okay, now since we're making SearchControls master of its own destiny, we're going to make App.js be ignorant of the searching behavior.
- So, now you have a design decision to make. Should dispatching setBreed inherently mean doing another search? If so you can take several approaches to make those automatically search. Here I've elected to make dispatching search explicit. It's a design decision.

```javascript
// delete pets initial state
// delete petfinder
// delete credentials
// delete search
// delete all attributes of <SearchControls />

// pass pets in
const mapStateToProps = (state) => {
  return {
    pets: state.pets
  }
}
```

- Feelsgoodman. I love deleting code. We externalized our state to Redux and now React doesn't have to care!
- Now we just pass pets into the App and our app should work again!
- Let's move favorites to Redux. In actions.js

```javascript
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
```

In reducers

```javascript
//import
import { SET_PETS, SET_BREED, SET_ANIMAL, ADD_FAVORITE, REMOVE_FAVORITE } from './actions'

// new reducers
const addFavorite = function (state, action) {
  const newState = {}
  const { favorites } = state
  Object.assign(newState, state, { favorites: favorites.concat(action.pet) })
  return newState
}

const removeFavorite = function (state, action) {
  const newState = {}
  const { favorites } = state
  Object.assign(newState, state, { favorites: favorites.filter((current) => action.pet.id !== current.id) })
  return newState
}

// new cases
case ADD_FAVORITE:
  return addFavorite(state, action)
case REMOVE_FAVORITE:
  return removeFavorite(state, action)
```

- In actionCreators.js

```javascript
export function addFavorite (pet) {
  return { type: ADD_FAVORITE, pet }
}

export function removeFavorite (pet) {
  return { type: REMOVE_FAVORITE, pet }
}
```

- We have all the necessary wires, let's go plug it in. Let's make Pet.js dispense the correct actions directly

```javascript
// import
import { connect } from 'react-redux'
import { ADD_FAVORITE, REMOVE_FAVORITE } from './actions'

// replace handleFavoriteChange
handleFavoriteChange () {
  this.props.dispatch({pet: this.props.pet, type: this.props.favorite ? REMOVE_FAVORITE : ADD_FAVORITE })
},

// replace export
export default connect()(Pet)
```

- Now Pet can dispatch its own actions for adding and removing favorites, meaning PetList and App no longer have to care at all about those actions. Very cool.
- Let's make PetList read directly from Redux.

```javascript
// import
import { connect } from 'react-redux'

// in render
let petList = this.props.isFavorites ? this.props.favorites : this.props.pets

// replace if and map statements
if (petsList.length > 0) {
  pets = petList.map((pet) => {

// delete toggleFavorites in <Pet>

// replace export
const mapStateToProps = function (state) {
  return {
    favorites: state.favorites,
    pets: state.pets
  }
}

export default connect(mapStateToProps)(PetList)
```

- Now we made it so you just pass PetList a flag if it reads from favorites or if it reads from pets and it manages itself. Let's go make App the dumb shell it should be.

```javascript
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import PetList from './PetList'
import SearchControls from './SearchControls'

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <img src='src/adopt-me.png' alt='adopt-me logo' />
      <SearchControls />
      <PetList
        title={'Search Results'}
      />
      <PetList
        isFavorites
        title={'Favorites'}
      />
    </div>
  </Provider>
)

export default App
```

- Now App has no state and no props. It simply is the layout for the app and that's it! 
- It doesn't even need to be connected anymore since App itself isn't reading from Redux. So now we can make Provider just wrap App and get rid of that Provided and Connected App business.
- This is where Redux shines. By centralizing our state, we've made it so things like PetList and App don't have to care about things like `toggleFavorite`. We can make Pet care about it and just directly plug into it. Before we had to make App care because that state had to be shared across components.
- Let's move the last bit of state into Redux: breeds. In actions.js

```javascript
export const SET_BREEDS = 'SET_BREEDS'
```

- In reducers.js

```javascript
// import
import { SET_PETS, SET_BREED, SET_ANIMAL, ADD_FAVORITE, REMOVE_FAVORITE, SET_BREEDS } from './actions'

// add reducer
const setBreeds = function (state, action) {
  const newState = {}
  Object.assign(newState, state, {breeds: action.breeds})
  return newState
}

// add default state
breeds: [],

// add switch case
case SET_BREEDS:
  return setBreeds(state, action)
```

- In actionCreators.js

```javascript
// import
import { SET_PETS, SET_BREED, SET_ANIMAL, ADD_FAVORITE, REMOVE_FAVORITE, SET_BREEDS } from './actions'

// add new async action creator
export function getBreeds () {
  return function (dispatch, getState) {
    const { animal } = getState()
    pf.breed.list({animal})
      .then((data) => {
        console.log(data)
        let breeds = []
        if (data.petfinder.breeds) {
          breeds = data.petfinder.breeds.breed
        }
        dispatch({type: SET_BREEDS, breeds})
      })
  }
}
```

- Another thunk here.
- In SearchControls.js

```javascript
// delete petfinder and credentials

// import getBreeds
import { setBreed, setAnimal, search, getBreeds } from './actionCreators'

// add this line to the bottom of componentDidMount and handleAnimalChange
this.props.dispatch(getBreeds())

// change the state.breeds.map to props.breeds.map
{this.props.breeds.map((breed) => (

// add to mapStateToProps
breeds: state.breeds,
```

- And that is it! Our app now totally reads and writes to Redux! And we have here a very acceptable way to structure an app. 
- We're going to go above and beyond to achieve to what Henrik Joreteg referred to as ["predictable sentience"][henrik-tweet].
- In actionCreators.js

```javascript
export function setBreed (breed) {
  return function(dispatch) {
      dispatch({ type: SET_BREED, breed })
      dispatch(search())
    }
}

export function setAnimal (animal) {
  return function(dispatch) {
    dispatch({ type: SET_ANIMAL, animal })
    dispatch(getBreeds())
    dispatch(search())
  }
}
```

- By using a thunk here, we've made so our actionCreator can dispatch multiple actions. We can first do a sync action to update the necessary bits and then dispatch the necessary actions to update the store with the correct data from the server.
- This makes so your store will never be out of date with changes to animal and breed. It means you don't have to remember which actions in which order need to be dispatched if you call setAnimal somewhere else.
- The downfall is a few: what if we wanted to wait and batch our changes? This prevents that because these will get all dispatched as soon as one action is called. It also means that if you have a subscriber listening to the store (via `store.subscribe`) they will get updated multiple times for one action. In our case we have no subscribers other than React so this is okay but it can be problematic.
- If you needed to mitigate the batching problem, instead of converting setAnimal and setBreed to dispatch multiple actions, we would have made another action creator that would have called setAnimal/setBreed and search/getBreeds. This way both the sync, single action and the async, multi action action creators would be available.
- That's it! Well done! Congrats on your first React-Redux  app! Further topics include testing (soon to be baked into create-react-app,) server-side rendering, and advance topics in Redux like other middlewares.

## Redux Testing

[cra]: https://github.com/facebookincubator/create-react-app
[reddit-react]: https://twitter.com/holtbt/status/493852312604254208
[enclave]: https://github.com/eanplatter/enclave
[destructuring]: http://www.2ality.com/2015/01/es6-destructuring.html
[deku]: https://github.com/anthonyshort/deku
[project-files]: https://github.com/btholt/react-redux-workshop
[petfinder]: https://www.petfinder.com/developers/api-key
[henrik-tweet]: https://twitter.com/HenrikJoreteg/status/767241194149588992
[node]: https://nodejs.org
