# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Custom Domain Name

GoDaddy does not play nice, so I had to follow different instructions from https://successengineer.medium.com/how-to-setup-heroku-with-godaddy-d8e936d10849.

Summary

- GoDaddy: You have to purchase a domain name through a normal registar, I happen to do GoDaddy
- GoDaddy: As of a part of that purchase, you also need to get an SSL certificate. In my case with Goadday this was a part of the purchase
- Heroku: You can't configure SSL on eco dynos, so on Heroku you have to upgrade the dyno to basic
- Heroku: Upgrading to a Basic Dyno will automated enable [Automated Certificate Management (ACM)](https://devcenter.heroku.com/articles/automated-certificate-management) 
- Heroku: You then have to "Add Domain", for which was given www.clothescloset.app, however that will fail ACL
- Heroku: You then have to "Add certificate", and give it the public key, which is crt or pem, and then give it the private key
- GoDaddy:I had to change the CNAME of www from clothescloset.app. to hydrophobic-opossum-wr08a493ub5g96y180o2acm8.herokudns.com
- GoDaddy:Removed the A record of @ that was set to Parked
- This thus far gets the domain of https://www.clothescloset.app/ working
- I would not for the life of my get forwarding to handle removing www from the URL
- Google Cloud: Per https://console.cloud.google.com/apis/credentials/oauthclient/802540763450-gblh2ivaea2rjgk4rmemjulsnoa2968a.apps.googleusercontent.com?project=clothes-closet-374119, you have to add the new URL for https://www.clothescloset.app/ as an authorized origin to the OAuth credential



```
=== clothes-closet Custom Domains
 Domain Name           DNS Record Type DNS Target                                                 SNI Endpoint         
 ───────────────────── ─────────────── ────────────────────────────────────────────────────────── ──────────────────── 
 www.clothescloset.app CNAME           hydrophobic-opossum-wr08a493ub5g96y180o2acm8.herokudns.com mamenchisaurus-27941 
```





