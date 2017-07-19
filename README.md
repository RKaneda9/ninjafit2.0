# NinjaFit2.0

This project isn't completely done. There's still a lot of content and minor tweaks that need to be made. But, until the owners at NinjaFit decide they wish to go with this website and get some new high quality images, this project is going to be stashed. 

## Startup
Run the following commands
1. `npm i`
2. `npm start`

## Server Settings
View /server/settings.json to change your preferences for running the local server.

## Structure and Takeaways From This Project
I'm going to outline the project and what I feel like worked and didn't. Feel free to take what you want from it.

### Structure
| Folder under /src | Description |
| ----------------- | ----------- |
| `src/main` | is the application or script that is initially loaded onto the page. It binds to window.resize and determines which application is to be loaded based on the window. For this case it's just desktop or mobile applications. But, when the window is resized, the active application will change dynamically. A large window resized to a smaller window will reflect by showing the mobile application. |
| `src/desktop` | The application shown for large window sizes. A full Inferno application on it's own. |
| `src/mobile`  | The application shown for smaller window sizes. A full Inferno appliation on it's own. |
| `src/helpers` | A library of utility helpers. This library is shared across all applications. |
| `src/services` | A folder of service modules. These modules are shared between desktop & mobile for the use of sending to and retrieving data from the backend api. |
| `src/shared` | Inferno components and containers that are shared between each application. |

### Application Switching 
When the window resizes, the main application will determine which sub-application(s) should be active for the new window parameters. If the determined sub-application(s) is already active, nothing occurs. If it's not active but already loaded on the page (via lazy require or require.ensure - see Webpack's documentation for require.ensure), it's simply set to active. If it's not active and not yet loaded on the page, a loader will be shown and the application is requested. 

To make the loader flow smoothly when shown and removed, I did a few things:
* The DOM body (and therefore the loader itself), and every sub-application all use the same background color.
* The previously active sub-application will continue to be on the page until the new one loads. 
* The loader shows as completely transparent and fades in over the previously active application so there's no "jumping" or anything uneasy for the eyes. The loader has a backend that covers the page, so when it's finished loading, it completely covers the previously active application.
* The loader that shows while an application is loading is the same loader that initially shows when the webpage is initially loading (before any sub-application is active). This makes it familiar. When the webpage initially loads, the loader has an animation, but when a new application is loading, the loader simply shows as it's completed state, thus not taking too much attention away and becoming distracting.

I really like how this application switching turned out. I will definitely be using it in the future and continue to improve upon it.

### Mobile Application Review
The mobile application emphasizes a sort of "angled cut" in it's overall styling. Using triangles for buttons, content's top and bottom borders are angled at the same degree, etc. This flows with the "Ninja" theme really well. I really like how this came out and I find it very unique. Here are some of the other things that I liked:

* The menu for this app. Feel free to play with it and view a separated source code for it on CodePen [here](https://codepen.io/Kaneda9/pen/NpZGEK)

* Submit button animation. This is only viewable from longer interactions, like submitting a question (from the bottom of the home page). You can also play around the animation on CodePen [here](https://codepen.io/Kaneda9/pen/vZYBBG)

* Pricing Items and switching between them. See the Join Us page. Select a pricing item that's far away from the currently active item.

* Using an image of a google map. I hadn't realized how costly using an google map iframe was. It activates analytics and loads several things that, while they may be necessary for a larger application, are not needed here. The image links to the actual google map url.

### Desktop Application Review
As a whole, I'm actually not entirely a fan of this app (yes, I am my own worst critic). I found that everything that made the mobile app standout was not feasible in a desktop sized browser window. I ended up doing a lot things that, while unique in their own, kinda went away from the whole "ninja" theme. Regardless, here are some of things that I liked:

* The menu. The menu on it's own is unique and interesting. In order to make full use of this menu style (so it doesn't lag) the application as a whole needs to be lightweight. Checkout the menu on it's own on CodePen [here](https://codepen.io/Kaneda9/pen/LyaoBq)

* The Tesimonials. This is towards the bottom of the home page. I don't know why this stands out to me. Possibly it's the placement of based on the items around it.

* Content Spacing. I believe this application does a good job of utilizing blank space and the spacing of content. It feels like it flows simply and doesn't seem complex. Yet, I don't feel like there's too much whitespace on any pages. Even for the Login page.

### Contact Links
For contact links, there are some things you can do to make the link more functional. Here are some examples:

* Email Link - Clicking on this will open whatever default email the device or computer has with the email address filled. You can also add other things like "mailto:example@gmail.com;subject: Hello" to fill a subject.

```html
<a href="mailto:example@gmail.com">
  <!-- icon -->
  <span>example@gmail.com</span>
</a>
```

* Phone Numbers - Clicking on this will actually dial this number from a device (it'll ask for a confirmation of whether they actually want to dial this number first of course).

```html
<a href="tel:800-888-888">
  <!-- icon -->
  <span>(800) 888-8888</span>
</a>
```

