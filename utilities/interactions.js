const { choose_series } = require("./embedFunctions");


const interactionsHandler = {

    roulette: () => {

    },

    inventory: () => {
        

    },

    series_options: (interaction) => {

        return choose_series();        
    },

    type_options: () => {
        
    },

    open_loot_box: () => {
        await interaction.reply({ embeds: [choose_series()], components: [buttons.pick_Series()] });
        
          const filter = i => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        
          collector.on('collect', async i => {
          console.log('Collected interaction:', i.customId);
          
            if (i.customId === 'choose_series_1') {
              previousInteractionId = 'choose_series';

              await i.update({ embeds: [choose_type()], components: [buttons.armor_Box_S1(), buttons.back_button(previousInteractionId)] })
                .catch(console.error);

              const boxFilter = i => i.customId === 'armor_s1' && i.user.id === interaction.user.id;
              const boxCollector = interaction.channel.createMessageComponentCollector({ filter: boxFilter, time: 15000 });
          
              boxCollector.on('collect', async i => {
                console.log('Collected box interaction:', i.customId);

                var correct_coin = await coin_check(db, interaction.user.id, 50);

                if (correct_coin === false) {
                  await i.update({ content: 'You do not have enough coins to open a loot box', embeds: [], components: [], ephemeral: true });
                  return;
                } else {
                  
                updateCount(db, 'inventory', 'coin_count', interaction.user.id, -50);
                const result = await open_loot_box(db, interaction.user.id, 1, 'armor');
                const { embed, attachment } = result;
                await i.update({embeds: [embed], files: [attachment], components: [buttons.back_button()]})
                    .catch(console.error);
              while(true) {
                if(i.customId === previousInteractionId) {
                  await i.update({ embeds: [choose_series()], components: [buttons.pick_Series()] });
                  
                } else if(i.customId === 'armor_s1') {
                  const result = await open_loot_box(db, interaction.user.id, 1, 'armor');
                  const { embed, attachment } = result;
                  await i.update({ embeds: [embed], attachments: [attachment], components: [buttons.armor_Box_S1(), buttons.back_button(previousInteractionId)], inline: true});
                }
                break;
              }
              }         
            });
            } else if (i.customId === previousInteractionId) {
              await i.update({ embeds: [choose_series()], components: [buttons.pick_Series()], inline: true });
            }
          });
        
    },
};

