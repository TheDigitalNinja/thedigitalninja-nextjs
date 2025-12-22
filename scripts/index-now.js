/**
 * @file scripts/index-now.js
 * @description CLI script for submitting URLs to the IndexNow API
 *
 * This script provides a command-line interface for submitting URLs to the IndexNow API.
 * It validates the provided URL, checks if the content is accessible, and then submits
 * it to IndexNow for immediate indexing by search engines.
 *
 * Usage: node scripts/index-now.js <url>
 * Example: node scripts/index-now.js https://TheDigital.Ninja/your-new-post
 *
 * Dependencies:
 * - commander: for parsing command-line arguments
 * - axios: for making HTTP requests
 *
 * Configuration:
 * - API_KEY: Your IndexNow API key
 * - KEY_LOCATION: URL where your API key file is hosted
 */

const { program } = require('commander');
const axios = require('axios');
const { URL } = require('url');

const API_KEY = 'd86aa2e7f75e44ca93ca7dbb94cca2d3';
const KEY_LOCATION = `https://TheDigital.Ninja/${API_KEY}.txt`;
const INDEX_NOW_API = 'https://api.indexnow.org/IndexNow';

async function validateUrl(url) {
  try {
    new URL(url); // Throws if the URL is invalid
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    console.error(`Error validating URL: ${error.message}`);
    return false;
  }
}

async function submitUrl(url) {
  if (!await validateUrl(url)) {
    console.error('Invalid URL or content not accessible');
    return;
  }

  try {
    const response = await axios.post(INDEX_NOW_API, {
      host: new URL(url).hostname,
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: [url]
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`Successfully submitted ${url} to IndexNow. Status: ${response.status}`);
      if (response.status === 202) {
        console.log('The submission was accepted and will be processed soon.');
      }
    } else {
      console.error(`Unexpected response when submitting ${url}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error submitting URL: ${error.message}`);
  }
}

program
  .version('1.0.0')
  .description('CLI to submit URLs to IndexNow')
  .argument('<url>', 'URL to submit')
  .action(submitUrl);

program.parse(process.argv);

