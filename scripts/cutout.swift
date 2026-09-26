// Cuts the subject out of a photo into a transparent PNG, on-device via Apple Vision (macOS only).
// Usage: swift scripts/cutout.swift in.jpg out.png

import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let inURL = URL(fileURLWithPath: args[1]), outURL = URL(fileURLWithPath: args[2])
let input = CIImage(contentsOf: inURL)!
let handler = VNImageRequestHandler(ciImage: input)
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let result = req.results?.first else { print("no subject"); exit(1) }
let maskPB = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
let mask = CIImage(cvPixelBuffer: maskPB)
let blend = CIFilter.blendWithMask()
blend.inputImage = input
blend.backgroundImage = CIImage.empty()
blend.maskImage = mask
let out = blend.outputImage!.cropped(to: input.extent)
let ctx = CIContext()
let cg = ctx.createCGImage(out, from: input.extent, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)!
let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, cg, nil)
CGImageDestinationFinalize(dest)
print("ok")
