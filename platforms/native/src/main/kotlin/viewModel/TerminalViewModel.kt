package viewModel

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import java.io.File
import java.util.concurrent.TimeUnit

class TerminalViewModel {
    private val _outputFlow = MutableStateFlow("Initializing terminal...")
    val outputFlow: StateFlow<String> = _outputFlow

    private val homeDir = System.getProperty("user.home")
    private val starshipPath = "\$homeDir/.local/bin/starship"

    fun runStarship() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Check if starship exists and is executable
                val starshipFile = File(starshipPath)
                if (!starshipFile.exists() || !starshipFile.canExecute()) {
                    _outputFlow.value = "Error: 'starship' not found at \$starshipPath or is not executable."
                    return@launch
                }

                val process = ProcessBuilder(starshipPath, "prompt")
                    .directory(File(homeDir))
                    .redirectErrorStream(true)
                    .start()

                process.waitFor(5, TimeUnit.SECONDS)
                val output = process.inputStream.bufferedReader().readText()
                _outputFlow.value = output.trim()

            } catch (e: Exception) {
                _outputFlow.value = "Failed to run starship: \${e.message}"
            }
        }
    }
}
