# Installation Guide for HyPhy

**Note:** HyPhy is not currently available for Windows.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fgNrPbOTpxE?si=uxwjTYF3Fd7pdV9D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## MP and MPI Versions

HyPhy can be built in two main flavors:

1. **Multi-threaded (MP):** Requires a compiler that supports OpenMP.
2. **MPI-enabled (MPI):** Designed for execution on clusters and requires an MPI-supported build and execution environment (e.g., OpenMPI).

Both multi-threading and MPI environments can significantly improve the performance of HyPhy analyses, especially for common analyses like FEL, MEME, FUBAR, and GARD.

## Building from Source

To install HyPhy after downloading or cloning the repository, follow these steps:

### Dependencies

Ensure you have the following dependencies before building from source:

- CMake (>= 3.12)
- GCC (>= 4.9)
- Libraries:
  - libcurl
  - libpthread
  - openmp (Install on macOS using: `brew install libomp`)

### Step 1: Navigate to HyPhy Directory

```bash
cd hyphy
```

### Step 2: Configure HyPhy Using CMake

Run the following command:

```bash
cmake .
```

- By default, HyPhy will be installed in `/usr/local/`. To specify a custom installation path, use:

  ```bash
  cmake -DCMAKE_INSTALL_PREFIX=/location/of/choice .
  ```

- To use a different build system (supported by CMake), such as XCode, configure HyPhy using the generator (`-G`) option:

  ```bash
  cmake -G Xcode .
  ```

- If you need to specify a particular C/C++ compiler (must support C++14), use:

  ```bash
  cmake -DCMAKE_CXX_COMPILER=/path/to/C++-compiler -DCMAKE_C_COMPILER=/path/to/C-compiler .
  ```

### Step 3: Build HyPhy

You can build HyPhy with one of the following commands:

- To create the HYPHYMP executable:

  ```bash
  make hyphy
  ```

  For faster builds, utilize multiple processors:

  ```bash
  make -j hyphy
  ```

- To create the HYPHYMPI executable:

  ```bash
  make MPI
  ```

**Note on building:**

- `hyphy`: Builds a HyPhy executable (`hyphy`) that supports symmetric multiprocessing via OpenMP. If OpenMP is not supported, the executable will be single-threaded. You can check if OpenMP is enabled in the output from CMake.

- `MPI`: Builds a HyPhy executable (`HYPHYMPI`) for parallel execution using the Message Passing Interface (MPI). Ensure that an MPI library (e.g., OpenMPI) is installed and available in your path.

### Step 4: Install HyPhy

Run the following command to install HyPhy:

```bash
make install
```

HyPhy will be installed either in its default path (`/usr/local/`) or the custom path specified during the CMake configuration.

- `HYPHYMP(I)` will be installed at `/location/of/choice/bin`.
- `libhyphy_mp` will be installed at `/location/of/choice/lib`.
- HyPhy's standard library of scripts/batch files will be installed at `/location/of/choice/lib/hyphy`.

## Environment Options

To specify the path HyPhy searches for its library sources, you can do one of the following:

1. **Set `LIBPATH` Argument:**

   ```bash
   hyphy LIBPATH=/usr/local/lib/hyphy
   ```

2. **Set Environment Variable:**

   ```bash
   export HYPHY_LIB_PATH=/usr/local/lib/hyphy/
   hyphy
   ```

## Additional Notes

The CMake script will build HyPhy with all available features on the host system (e.g., AVX and AVX-2 instructions). If you plan to execute HyPhy in a heterogeneous cluster environment where not all nodes support these instructions, use the following command to avoid AVX-related issues:

```bash
cmake -DNOAVX=ON ./
```

## Benchmarks

For benchmarks of common HyPhy methods using `mpirun` with an escalating number of processors, refer to the link [here](https://observablehq.com/@stevenweaver/hyphy-benchmarks-and-profiling).
