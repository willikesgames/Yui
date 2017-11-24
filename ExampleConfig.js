
const config = {

  
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "ownerID": "Your ID Here!",

  //Bot Contributors, level 10 by default. These people are given acess to debug commands.
  //When self hosting you probably don't need this unless you are changing code.
  "contributors":[],
  // Bot Admins, level 9 by default. Array of user ID strings.
  "admins": [],

  // Bot Support, level 8 by default. Array of user ID strings
  "support": [],

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  "token": "Your Bot Token here!",

  // Default per-server settings. New guilds have these settings.

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.

  "defaultSettings" : {
    "prefix": ["y!", "Y!"], //The prefixes used. Must be an array. It's good to, if you are using a letter, to have both a capital and a lowercase version of your prefix.
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "GeneralChannel":"general",
    "AnnouncementsChannel":"announcements",
    "BotAnnouncementsEnabled":"true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "Say hello to {{user}}!",
    "welcomeEnabled": "true",
    "dmWelcomeEnabled": "false", //Whether or not the bot can DM people who join the server.
    "dmWelcomeMessage": "Welcome {{user}} to {{server}}!", //Message DMed to a user when they join the server.
    "debug": "false" //Whether or not the debug mode is active. LEAVE THIS AS FALSE AS A DEFAULT! This, if set to true, might not be able to be turned off in the server.
  },

  "defaultServerScore": {},

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User",
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 2,
      // This is the name of the role.
      name: "Moderator",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    { level: 4,
      name: "Server Owner",
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they join, in order to help troubleshoot the bot on behalf of owners and contributors.
    { level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    //People who contribute code to the bot. Has acess to all debug commands.
    {
      level: 10,
      name: "Contributors",
      check: (message) => config.contributors.includes(message.author.id)
    },
    // This is the bot owner, this should be the highest permission level available.
    // Can use commands that could be dangerous. Only useful if eval or exce is added. Otherwise pretty much unused.
    { level: 11,
      name: "Bot Owner",
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
