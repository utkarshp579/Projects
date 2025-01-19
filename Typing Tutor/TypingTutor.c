#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_WORDS 10
#define MAX_WORD_LENGTH 15

// Function to display instructions to the user
void displayInstructions()
{
    printf("Welcome to Typing Tutor!\n");
    printf("Type the given words as fast as you can and with accuracy.\n");
    printf("Press Enter to start...\n");
    getchar(); // Wait for Enter key
}

double calculateAccuracy(char *original, char *typed)
{
    int correctChars = 0;
    int len = strlen(original);

    // Count correct character
    for (int i = 0; i < len; i++)
    {
        if (original[i] == typed[i])
        {
            correctChars++;
        }
        
    }

    // Calculate Accuracy Percentage
    return (double)correctChars / len * 100.0;
}

int main()
{
    // Array of words for typing practice
    const char *wordList[MAX_WORDS] = {"programming", "keyboard", "accuracy", "challenge", "speed", "language", "practice", "computer", "typing", "learning"};
    // Display instructions to the user
    displayInstructions();

    // Seed for random word selection
    srand(time(NULL));

    int totalWords = 0;
    int correctWords = 0;
    clock_t startTime, endTime;
    double totalTime, accuracy;

    printf("Typing Tutor starts now!\n");

    startTime = clock();

    while (totalWords < MAX_WORDS)
    {
        char typedWord[MAX_WORD_LENGTH];
        printf("Word %d: %s\n", totalWords + 1, wordList[totalWords]);
        printf("Type the word: ");
        scanf("%s", typedWord);

        // check if typed word is correct
        if (strcmp(typedWord, wordList[totalWords]) == 0)
        {
            printf("Correct!\n");
            correctWords++;
        }
        else
        {
            printf("Incorrect!\n");
        }

        totalWords++;
    }

    endTime = clock();

    // Calculate typing Session statistics
    totalTime = ((double)(endTime - startTime)) / CLOCKS_PER_SEC;
    accuracy = (double)correctWords / MAX_WORDS * 100.0;

    printf("\nTyping Tutor Summary:\n");
    printf("Total time taken: %.2f seconds\n", totalTime);
    printf("Accuracy: %.2f%%\n", accuracy);
    printf("Typing speed: %.2f words per minute\n", (double)MAX_WORDS / totalTime * 60);

    return 0;
}
