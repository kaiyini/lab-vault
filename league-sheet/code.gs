// made during high school

// formats google sheet and estimates my average lane performance relative to my league of legends account rating 
// based on lane deficit/surplus across 1000 matches

function lanePercent() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var matchNum = sheet.getLastRow();  // the number of league matches recorded in the spreadsheet
  
  var countCell = sheet.getRange("A1");
  var laneCell = sheet.getRange("L1");
  // the starting coordinates to be referenced in the sheet array
  
  while (countCell.getColumnIndex() <= 6) {
    // logs lane power average by column, when finished the column range resets and offsets to the right
    
    var matchValue = 0;
    while (countCell.getRowIndex() <= matchNum) {
      // checks background color of range, increments value based on range background
      var laneColor = countCell.getBackground();
      if (laneColor == '#d9ead3') {
        matchValue = matchValue + 2;
      } else if (laneColor == '#d9d9d9') {
        matchValue = matchValue + 1;
      } else {
        matchValue = matchValue + 0;
      }
      countCell = countCell.offset(1,0); 
    }
    
    countCell = countCell.offset(-matchNum,1);
    laneCell.setValue(matchValue/(matchNum*2));
    
    // compares logged lane average to a value and assigns background color to logs
    if (laneCell.getValue() < 0.42) {
      laneCell.setBackground('#cc4125');
    } else if (laneCell.getValue() < 0.45) {
      laneCell.setBackground('#dd7e6b');
    } else if (laneCell.getValue() < 0.485) {
      laneCell.setBackground('#f4cccc');
    } else if (laneCell.getValue() < 0.515) {
      laneCell.setBackground('#d9d9d9');
    } else if (laneCell.getValue() < 0.55) {
      laneCell.setBackground('#d9ead3');
    } else if (laneCell.getValue() < 0.60) {
      laneCell.setBackground('#93c47d');
    } else laneCell.setBackground('#c9daf8');
    laneCell.offset(0,-1).setBackground(laneCell.getBackground())
    laneCell = laneCell.offset(1,0);
  }
}


function feelsBad() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var matchNum = sheet.getLastRow();
  var laneWins = 0;
  var gameLoss = 0;
  for (var i = 1; i <= matchNum; i++) {
    var cellSelect = sheet.getRange("E"+i.toString());
    var laneCheck = cellSelect.getBackground();
    var gameCheck = cellSelect.offset(0,1).getBackground();
    if (laneCheck == '#d9ead3') {
      laneWins++;
      if (gameCheck == '#f4cccc'){
        gameLoss++;
      }
    }
  }
  var logLane = sheet.getRange("L8");
  logLane.setValue(gameLoss/laneWins);
  var logGame = sheet.getRange("K8");
  logGame.setValue(gameLoss/matchNum);
}
