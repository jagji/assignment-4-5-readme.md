/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Masoumeh Hosseinnazhad
 *      Student ID: 131612228
 *      Date:       2024-03-14
 */

document.addEventListener("DOMContentLoaded", function () {
  // This function will run when the page is fully loaded

  // Get references to elements in the DOM
  const menuElement = document.getElementById("menu");
  const selectedCategoryElement = document.getElementById("selected-category");
  const tableBody = document.getElementById("category-products");

  // Get the artists and songs data from the global window object
  const artists = window.categories;
  const songs = window.songs;

  // Create buttons for each artist
  artists.forEach((artist) => {
    const menuButton = document.createElement("button");
    menuButton.setAttribute("class", "btn");
    menuButton.textContent = artist.name;
    menuElement.appendChild(menuButton);

    // Add a click event listener to each button
    menuButton.addEventListener("click", function () {
      display(artist);
    });
  });

  // Show a list of songs for the default artist (the first one)
  display(artists[0]);

  function display(categories) {
    // Update the selected artist's name above the table
    // eslint-disable-next-line no-undef
    selectedCategoryElement.textContent = `${categories.name} Name (${categories.links[0].name})`;
    selectedCategoryElement.href = categories.links[0].url1;

    // Clear the current table rows
    const artistLinksRow = document.createElement("tr");
    const artistLinksData = document.createElement("td");
    const artistLink = document.createElement("a");
    artistLink.href = categories.links[0].url;
    artistLink.textContent = categories.links[0].name;
    artistLink.target = "_blank";
    artistLinksData.appendChild(artistLink);
    artistLinksRow.appendChild(artistLinksData);

    // Append the artist link row to the table body
    tableBody.appendChild(artistLinksRow);

    // Filter songs for the chosen artist that are not discontinued
    const filteredSongs = songs.filter((song) => {
      return song.categories.includes(categories.id) && !song.discontinued;
    });

    // Call the songBody function to display songs for the artist
    songBody(categories, filteredSongs);
  }

  // Define the songBody function to display songs for an artist
  function songBody(artist, artistSongs) {
    artistSongs.forEach((song) => {
      // Create table rows for each song and populate data
      const tableRow = document.createElement("tr");

      // Add a click handler to the table row to log the song

      // Create table data for song name
      const songNameData = document.createElement("td");
      const songNameLink = document.createElement("a");
      songNameLink.href = song.youtubeLink;
      songNameLink.textContent = song.title;
      songNameLink.target = "_blank";
      songNameData.appendChild(songNameLink);

      // Create table data for year
      const songYearData = document.createElement("td");
      songYearData.textContent = song.year ? song.year : "N/A";

      // Create table data for duration
      const songDurationData = document.createElement("td");
      songDurationData.textContent = song.Duration ? song.Duration : "N/A";

      // Append table data to the table row
      tableRow.appendChild(songNameData);
      tableRow.appendChild(songYearData);
      tableRow.appendChild(songDurationData);

      // Append the table row to the table body
      tableBody.appendChild(tableRow);
    });
  }
});
